import { useState } from 'react';
import '../styles/Profile.css'
import { getUser, updateUser } from '../services/user';
import { Link, useLoaderData, useNavigate } from 'react-router-dom'

export const loader = async ({ params }) => {
    const { UserID } = params;
    const user = await getUser( null, UserID);
    return { name: user.name, image: user.image, id: user.id }
}

export default function Profile() {
    const navigate = useNavigate()
    const { name, image, id } = useLoaderData()
    const [ picture, setPicture ] = useState('')
    const [ Name, setName ] = useState('')

    const handleCancelButton = e => {
        e.preventDefault()
    
        const result = confirm('Tem certeza? Todas as alterações serão desfeitas')
        if(result) {
            navigate('/home/content');
            setName('')
            setPicture('')
        } 
    }

    const handleSaveButton = async e => {
        e.preventDefault();
        if( name || picture ) {
            await updateUser(id, Name, picture)
        
        } else {
            alert('Precisa preencher ao menos um campo para salvar.')
        }
        setName('')
        setPicture('')
    }

    return (
        <div className='container-content'>
            <header>
                <Link to="/home/content">
                    <img 
                        src="https://logodownload.org/wp-content/uploads/2014/10/netflix-logo-1-1.png" 
                        alt="Logo by netflix" 
                        className='header-profile-logo'    
                    />
                </Link>
            </header>
            <form>
                <main className='main'>
                    <h1 className='form-title'>
                        Edit Profile
                    </h1>
                    <div className='user-settings'>
                        {image? 
                            <img 
                                src={image} 
                                alt={ `A photo by ${name}`} 
                                className='img-profile'
                            />                            
                        : 
                            <img 
                                src="https://i.pinimg.com/originals/fb/8e/8a/fb8e8a96fca2f049334f312086a6e2f6.png" 
                                alt="A icon representing a profile user picture" 
                                className='img-profile'
                            />
                        }
                        <div className='change-user'>
                            <input 
                                type="text" 
                                className='update-camp'
                                placeholder='Selecionar foto'
                                value={ picture }
                                onChange={ e => setPicture(e.target.value)}
                            />
                            <input 
                                type="text" 
                                className='update-camp'
                                placeholder='Trocar Nome'
                                value={Name}
                                onChange={e => setName(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='options'>
                        <button 
                            className='options-bttn'
                            onClick={ handleSaveButton }
                        >
                            SAVE
                        </button>
                        <button 
                            className='options-bttn'
                            onClick={ handleCancelButton }
                        >
                            CANCEL
                        </button>
                    </div>
                </main>
            </form>
        </div>
    )
}