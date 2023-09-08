import { Link, useLoaderData } from 'react-router-dom';
import { getDetails } from '../services/api';
import { IDetails } from '../Interfaces';
import '../styles/Details.css';
import { useEffect } from 'react';
import React from 'react';

export const loader = async ( {params} ) => {
    const { contentId } = params;
    const { details, video } = await getDetails(contentId, window.navigator.language);
    
    return { details, video }
}

export default function Details() {
    const {details, video} = useLoaderData() as IDetails;

    useEffect(() =>{
        const header = document.querySelector('.headerDetails') as HTMLElement
        header.style.background = `url("https://image.tmdb.org/t/p/original${details.backdrop_path}") center`
        header.style.backgroundPosition = 'center'
        header.style.backgroundSize = 'cover'
    }, [])

    const changeVideo = e => {
        const videoContainer = document.querySelector('.video') as HTMLMediaElement;
        const url = e.target.getAttribute('data-url')
        videoContainer.src = `https://www.youtube.com/embed/${url}`
    }
    
    const pasteDate = details.release_date.split('-')
    const formatedDate = pasteDate[2] + ' / ' + pasteDate[1] + ' / ' + pasteDate[0]
    return (
        <>
           <header className='headerDetails'>
                <div className='details'>
                    <div className='text_container'>
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
                                <p>Nota {details.vote_average.toFixed(1)}</p>
                                <p>Duração {details.runtime} minutos</p>
                                <p>Data de Lançamento: {formatedDate}</p>
                            </div>   
                    </div>
                </div>
           </header>
           <main className='video_container'>
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
                    {video[1]
                    ?
                    <p 
                        className='second-opt' 
                        data-url={video[1].key}
                        onClick={ changeVideo }
                    >
                        Teaser
                    </p>: ""
                     }
                </div>
                <iframe 
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