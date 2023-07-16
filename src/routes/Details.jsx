import { Link, useLoaderData } from 'react-router-dom';
import { getDetails } from '../services/api';
import '../styles/Details.css';
import { useEffect } from 'react';

export const loader = async ( {params} ) => {
    const { contentId } = params;
    const { details, video } = await getDetails(contentId, window.navigator.language);

    return {details, video}
}

export default function Details() {
    const {details, video} = useLoaderData();

    useEffect(() =>{
        const header = document.querySelector('.header')
        header.style.background = `url("https://image.tmdb.org/t/p/original${details.backdrop_path}") center`
        header.style.backgroundPosition = 'center'
        header.style.backgroundSize = 'cover'
    }, [])

    const changeVideo = e => {
        const videoContainer = document.querySelector('.video');
        const url = e.target.getAttribute('data-url')
        videoContainer.src = `https://www.youtube.com/embed/${url}`
    }
    
    return (
        <>
           <header className='header'>
                <div className='details'>
                    <div className='logo-container'>
                        <Link to={'/home/content'}>
                            <img 
                                src="https://logodownload.org/wp-content/uploads/2014/10/netflix-logo-1-1.png" 
                                alt="Logo by netflix" 
                                className='logo-netflix'
                            />
                        </Link>
                    </div>
                    <div className='title_subtitle'>
                        <h1>{ details.title }</h1>
                        <h3>{ details.tagline }</h3>
                    </div>
                    <h2 className='overview'>{ details.overview }</h2>
                    <div className='movie-data'>
                        <p>Nota {details.vote_average}</p>
                        <p>Duração {details.runtime} minutos</p>
                        <p>Data de Lançamento {details.release_date}</p>
                    </div>
                    
                </div>
           </header>
           <main>
                <div 
                    className='options_details'
                >
                    <p 
                        className='first-opt' 
                        data-url={video[0].key}
                        onClick={ changeVideo }
                    >
                        Trailer
                    </p>
                    <p 
                        className='second-opt' 
                        data-url={video[1].key}
                        onClick={ changeVideo }
                    >
                        Teaser
                    </p>
                </div>
                <iframe 
                    width="560" 
                    height="315" 
                    src={`https://www.youtube.com/embed/${video[0].key}`} 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen
                    className='video'
                >
                </iframe>                
           </main>
        </>
    )
}