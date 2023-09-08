import { API_CONFIG } from "../apiConfig";
const token = API_CONFIG.JWT;
const apiKey = API_CONFIG.APIKEY;

export interface IPopularMovies {
    popularMovies: {
        title:  string
        id: number
        poster_path: string
    }[]
    page: string
    results: Array<Object>
    total_pages: number
    total_results: number
}

export interface IDetails {
    details: IMovieData
    video: Object
}

export interface IMovieData {
    results: string
    adult: boolean;
    backdrop_path: string | null;
    belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string | null;
    backdrop_path: string | null;
    } | null;
    budget: number;
    genres: {
    id: number;
    name: string;
    }[];
    homepage: string;
    id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: {
      id: number;
      logo_path: string | null;
      name: string;
      origin_country: string;
    }[];
    production_countries: {
      iso_3166_1: string;
      name: string;
    }[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: {
      english_name: string;
      iso_639_1: string;
      name: string;
    }[];
    status: string;
    tagline: string;
    title: string;
     video: boolean;
    vote_average: number;
    vote_count: number;
      
}

export async function getPopularMovies(lang?: string): Promise<IPopularMovies> {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=${lang}-US&page=1`
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${token}`
    }}

    const res = await fetch(url, options);
    
    const data: IPopularMovies = await res.json();
    return data;
}

export async function getDetails(id: string, lang: string){
    const url = `https://api.themoviedb.org/3/movie/${id}?language=${lang}`
    const urlVideo = `https://api.themoviedb.org/3/movie/${id}/videos?language=${lang}`
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${API_CONFIG.JWT}`
    }}
    
    const resVideo = await fetch(urlVideo, options);
    const res = await fetch(url, options);
    const data: IMovieData = await res.json();
    const dataVideo:IMovieData = await resVideo.json();

    return {details: data, video: dataVideo.results};   
}


