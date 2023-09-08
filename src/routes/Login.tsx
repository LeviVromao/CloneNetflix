import { Link, Form, redirect } from 'react-router-dom'
import '../styles/Login.css'
import { authLogin } from '../services/user'
import React from 'react'

export async function action( {request} ) {
    const formData = await request.formData()
    const email = await formData.get('email')
    const { exist, user } = await authLogin(email)

    if( exist ){
        const userOBJ = JSON.stringify(user)
        localStorage.setItem('user', userOBJ);
        return redirect('/home/content');
    }

    alert(`${email}, inválido tente novamente com cuidado, ou faça o cadastro.`);
    return null
}

export default function Login() {
    return (
        <div className='background'>
           <main className="main-login">
               <Link to={'/'}>
               <img 
                    src="https://logodownload.org/wp-content/uploads/2014/10/netflix-logo-1-1.png" 
                    alt="Logo by netflix" 
                    className='logo-netflix'
                />
               </Link>
                <Form 
                    method='POST'
                    className='formLogin'
                >
                    <h1 className='h1-login'>Entrar</h1>
                    <div className='inputs-container'>
                        <input 
                            type="email" 
                            name="email" 
                            className="inputEMail"
                            placeholder='Email'
                        />
                        <input 
                            type="submit" 
                            value="Entrar" 
                            className="inputSubmit"
                        />
                    </div>
                    <p className='paragraph-login'>
                        Novo por aqui? 
                        <Link 
                            className='link-register'
                            to={'/'}>
                            Assine agora.
                        </Link>
                    </p>
                </Form>
            </main>
        </div>
    )
}