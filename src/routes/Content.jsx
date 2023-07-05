import '../styles/Content.css'
import { getPopularMovies, getDetails } from '../api';
import { useLoaderData, Link } from 'react-router-dom';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { useEffect, useState } from 'react';


export const loader = async () => {
    const lang = window.navigator.language;
    const popularMovies = await getPopularMovies(lang);
    return { popularMovies: popularMovies.results }
}


export default function Films() {
    const { popularMovies } = useLoaderData();
    const [ currentItem, setCurrentItem  ] = useState(0);
    const [ items, setItems ] = useState([]);
    const [ maxItems, setMaxItems ] = useState();
    const [ headerDetails, setHeaderDetails ] = useState([{}])
    
    useEffect(() => {
        const getInitialImage = async () =>{
            const nodeListItems = document.querySelectorAll('.item')
           
            const id = nodeListItems[currentItem].getAttribute('data-value');
            const details = await getDetails(id, window.navigator.language);
            const containerIMG = document.querySelector('.container-img');
            containerIMG.style.backgroundImage = `url("https://image.tmdb.org/t/p/original${details.backdrop_path}")`;
            containerIMG.style.backgroundPosition = 'center'
            containerIMG.backgroundSize = 'cover';
            setHeaderDetails( details )
        }
        getInitialImage()
    }, [])

    useEffect(() => {
        const nodeListItems = document.querySelectorAll('.item');
        setItems(nodeListItems);
        setMaxItems(nodeListItems.length)

    }, [ currentItem ])
    
    const handleLeftClick = async () =>{
        setCurrentItem(currentItem - 1);

        if(currentItem <= 0) {
            setCurrentItem( maxItems - 1 )
        }

        items[currentItem].scrollIntoView({
            inline: 'center',
            behavior: 'smooth'
        })

        const id = items[currentItem].getAttribute('data-value');
        
        const details = await getDetails(id, window.navigator.language);
        const containerIMG = document.querySelector('.container-img');
        containerIMG.style.backgroundImage = `url("https://image.tmdb.org/t/p/original${details.backdrop_path}")`;
        containerIMG.style.backgroundPosition = 'center';
        containerIMG.style.backgroundSize = 'cover'
        setHeaderDetails( details );
    }

    const handleRightClick = async () => {
        setCurrentItem(currentItem + 1);

        if(currentItem >= maxItems) {
            setCurrentItem( 0 );
        }

        items[currentItem].scrollIntoView({
            inline: 'center',
            behavior: 'smooth',
        })

        const id = items[currentItem].getAttribute('data-value');
        
        const details = await getDetails(id, window.navigator.language);
        const containerIMG = document.querySelector('.container-img');
        containerIMG.style.backgroundImage = `url("https://image.tmdb.org/t/p/original${details.backdrop_path}")`;
        containerIMG.style.backgroundPosition = 'center';
        containerIMG.style.backgroundSize = 'cover'
        setHeaderDetails( details );
    }
    return (
        <>
            <main className="main-home">
                <div className='container-img'> 
                    <div className="container-header">
                        <header className="home-header">
                            <div className="home-titles">
                                <i>Films and Series by Levii13</i>
                                <h1 className="content-info">
                                    {headerDetails.title}
                                </h1>
                            </div>
                            <p className="p-description">
                                {headerDetails.overview}
                             </p>
                             <button className="bttn-info">
                                <Link to={`/content/${headerDetails.id}`}
                                    className='link-bttn-info'
                                >
                                    More info
                                </Link>
                            </button>
                        </header>
                                
                            

                        <div className='container-carrossel'>
                                <i className="arrow-right" onClick={ handleRightClick }>
                                    <AiOutlineArrowRight />
                                </i>
                                <i className="arrow-left" onClick={ handleLeftClick }>
                                    <AiOutlineArrowLeft />
                                </i>
                            <div className="carrossel">
                                <div className="carrossel-wrapper">
                        
                                    {popularMovies.map( (movie, i) => {
                                        return <div className='item' key={i} data-value={`${movie.id}`}>
                                                    <img 
                                                        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} 
                                                        alt={`A photo by ${movie.title}`} 
                                                        className='carrousel-images'
                                                    />
                                               </div>
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
            