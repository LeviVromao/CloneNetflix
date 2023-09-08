import localforage from "localforage";
import { IUSer } from "../Interfaces";

let fakeCache = {};

async function fakeNetwork(key) {
if (!key) {
    fakeCache = {};
}
  
if (fakeCache[key]) {
    return;
}
  
fakeCache[key] = true;
return new Promise(res => {
    setTimeout(res, Math.random() * 800);
});
}

export async function createUser(email: string) {
    await fakeNetwork(email);
    let id = Math.random().toString(36).substring(2, 9);
    let user: IUSer = {id, email, createdAt: Date.now() };
    const alreadyExist = await getUser(user.email);

    if( alreadyExist ) return false

    await set(user);
    return user;
}

export async function authLogin( email: string ){
    const user = await getUser( email )

    if( user ) {
        return {
            exist: true, 
            user
        }
    }

    return {
        exist: false,
        user: null
    }
}

// export async function getUsers(query) {
//     await fakeNetwork(`getContacts:${query}`);
//     let contacts = await localforage.getItem("users");
//     if (!contacts) contacts = [];
//     if (query) {
//       contacts = matchSorter(contacts, query, { keys: 'email' });
//     }
//     return contacts.sort(sortBy("last", "createdAt"));
// }

export async function getUser(email?: string, id?: string | number) {
    await fakeNetwork(`contact:${email}`);
    let user: IUSer | undefined;
    let users: Array<IUSer> | null = await localforage.getItem("users");

    if(!users) return null;

    if(id && !email) {
        user = users.find(user => user.id === id);
    
    } else {
        user = users.find(user => user.email === email);
    
    }

    return user? user : null;
}

export async function updateUser(id: string | number, name: string, image: string) {
    const users: IUSer[] | null = await localforage.getItem('users');
    if (!users) return null;
  
    const updatedUsers = users.map((user) => {
      if (user.id === id) {
        const sanitizedName = name.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        const sanitizedImage = image.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return { ...user, name: sanitizedName, image: sanitizedImage };
      }
      return user;
    });
  
    await localforage.setItem('users', updatedUsers);
    return updatedUsers.find((user) => user.id === id);
}

export async function deleteUser(id: string | number) {
    let users: Array<IUSer> | null = await localforage.getItem("users");
    let index
    
    if(users) {
        index = users.find(user => user.id === id);
        if (index > -1) {
            users.splice(index, 1);
            await set(users);
            return true;
        }
    }
    return false;
  }
  
async function set(user: IUSer[] | IUSer) {
    const users: Array<Object> | null = (await localforage.getItem('users')) || [];
    console.log(users)
    users.push(user);
    await localforage.setItem('users', users);
}
