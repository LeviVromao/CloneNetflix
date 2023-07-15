import { Form, redirect, Link } from 'react-router-dom'
import { createUser } from '../user'
import '../styles/App.css'

export async function action( {request} ) {
    const formData = await request.formData()
    const email = await formData.get('email')
    const user = await createUser(email)

    if(user) {
        const USEROBJ = JSON.stringify(user)
        localStorage.setItem('user', USEROBJ)
        return redirect('/home/content')
    }
    alert(`${email}, já cadastrado no sistema, faça o login :)`)
    return null
}

function App() {

  return (
    <>
    <section className="section1">
        <div className="items-container1">

            <header className='header-root'>
                <img src="https://logodownload.org/wp-content/uploads/2014/10/netflix-logo-1-1.png" alt="Netflix-logo" />
                <div className="container-buttons">
                    <form method='GET'>
                        <select className="buttons select-root"> 
                            <option value="br">Português</option>
                            <option value="br-en">Inglês</option>
                        </select>   
                    </form>
                    <Link to={'/Login'}>
                        <button className="buttons">Entrar</button> 
                    </Link>
                </div>
            </header>
    
            <div className="container-principal">
    
                <h1>Filmes, séries e muito mais. Sem limites.</h1> 
                <p>Assista onde quiser. Cancele quando quiser. </p>
                <p>Pronto para assistir? Informe seu email para criar ou reiniciar sua assinatura.</p>
                <Form 
                  className="container-inputs"
                  method='POST'
                >                   
                  <input 
                    type="email" 
                    className="email" 
                    placeholder="Email"
                    name='email'
                  />

                  <input 
                    type="submit" 
                    value="Vamos lá >"
                  />    
                </Form>
            </div>
        </div>
    </section>

    <section className="section2">
        <div className="text-section2">
            <h1>Aproveite na TV.</h1>
            <p>Assista em Smart TVs, PlayStation, Xbox, Chromecast, Apple TV, aparelhos de Blu-ray e outros dispositivos.</p>
        </div>

        <div className="container-tv">
            <div className="tv-father">
                <img src=" https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/tv.png" alt="tv png" />
                <div className="netflix-home">
                    <video className="tv-video" autoPlay muted loop >
                        <source src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-tv-0819.m4v" type="video/mp4" />
                    </video>
                </div>
            </div>
        </div>
    </section>

    <section className="section3">
        
        <div className="container--section3--principal">
            <img className="Eleven-photo" src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/mobile-0819.jpg" alt="Cellphone image" /> 
            <div className="container-cellphone">
                <div className="banner-stranger-things">
                    <img src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/boxshot.png" alt="Banner Stranger Things" />
                </div>
                <div>
                    <h3>Stranger Things</h3>
                    <h4>Download em andamento...</h4>
                </div>
                <div className="gif-download">
                </div>
            </div>
        </div>
    
            <div className="text--section3">
                <h1>Baixe séries para assistir offline.</h1>
                <h3>Salve seus títulos favoritos e sempre tenha algo para assistir.</h3>
            </div>
    </section>
    <section className="section4">
        <div className="text--section4">
            <h1>Assista quando quiser.</h1>
            <h2>Assista no celular, tablet, Smart TV ou notebook sem pagar a mais por isso.</h2>
        </div>
        <div className="container--principal--section4">
            <img src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/device-pile.png" alt="macbook image"/>
            <div className="container--video--section4">
                <video className="Dustin-video" autoPlay muted loop>
                    <source src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-devices.m4v"/>
                </video>
            </div>
        </div>
    </section>

    <section className="section5">
        <img src="https://occ-0-1087-420.1.nflxso.net/dnm/api/v6/19OhWN2dO19C9txTON9tvTFtefw/AAAABWGB3YOpSh2wA7OOZQYD-MkalQ0oJEy-YEEpoPKAIenLtZf5lKeERDdKj-u6WnZx9wx_QuiDVHkGM_1QmVQt9yxM7mKjevBNHKFz.png?r=1b8" alt="image of childrens playing"/>
        <div className="text--section5">
            <h1>Crie perfis para crianças.</h1>
            <p>Deixe as crianças se aventurarem com seus personagens favoritos em um espaço feito só para elas, sem pagar a mais por isso.</p>
        </div>
    </section>
    <footer>
        <p>Dúvidas? Ligue <a href="tel:0800 591 8942">0800 591 8942</a></p>
        <ul className='ul-footer'>
            <li 
                className='li-footer'
                ><a href="https://" 
                className='link-footer'><span>Perguntas frequentes</span></a></li>
            <li 
                className='li-footer'
                ><a href="https://" 
                className='link-footer'><span>Media Center</span></a></li>
            <li 
                className='li-footer'
                ><a href="https://" 
                className='link-footer'><span>Resgatar cartão pré-pago</span></a></li>
            <li 
                className='li-footer'
                ><a href="https://" 
                className='link-footer'><span>Termos de Uso</span></a></li>
            <li 
                className='li-footer'
                ><a href="https://" 
                className='link-footer'><span>Informações corporativas</span></a></li>
            <li 
                className='li-footer'
                ><a href="https://" 
                className='link-footer'><span>Avisos legais</span></a></li>
            <li 
                className='li-footer'
                ><a href="https://" 
                className='link-footer'><span>Informações corporativas</span></a></li>
            <li 
                className='li-footer'
                ><a href="https://" 
                className='link-footer'><span>Avisos legais</span></a></li>
            <li 
                className='li-footer'
                ><a href="https://" 
                className='link-footer'><span>Central de ajuda</span></a></li>
            <li 
                className='li-footer'
                ><a href="https://" 
                className='link-footer'><span>Revelações com investidores</span></a></li>
            <li 
                className='li-footer'
                ><a href="https://" 
                className='link-footer'><span>Comprar cartão pré-pago</span></a></li>
            <li 
                className='li-footer'
                ><a href="https://" 
                className='link-footer'><span>Privacidade</span></a></li>
            <li 
                className='li-footer'
                ><a href="https://" 
                className='link-footer'><span>Entre em contanto</span></a></li>
            <li 
                className='li-footer'
                ><a href="https://" 
                className='link-footer'><span>Só na Netflix</span></a></li>
            <li 
                className='li-footer'
                ><a href="https://" 
                className='link-footer'><span>Conta</span></a></li>
            <li 
                className='li-footer'
                ><a href="https://" 
                className='link-footer'><span>Carreiras</span></a></li>
            <li 
                className='li-footer'
                ><a href="https://" 
                className='link-footer'><span>Formas de assistir</span></a></li>
            <li 
                className='li-footer'
                ><a href="https://" 
                className='link-footer'><span>Preferências de cookies</span></a></li>
            <li 
                className='li-footer'
                ><a href="https://" 
                className='link-footer'><span>Teste de velocidade</span></a></li>
        </ul>
        <select className="selec-footer">
            <option className="option" value="/br/">Português</option>
            <option className="option" value="/br-en/">Inglês</option>
        </select>
        <p>Leviih Brasil</p>
    </footer>
  </>
 )
}

export default App
