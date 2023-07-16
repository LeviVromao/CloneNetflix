import { API_CONFIG } from "../apiConfig";
const token = API_CONFIG.JWT || process.env.TOKEN;
const apiKey = API_CONFIG.APIKEY || process.env.APIKEY;

export async function getPopularMovies(lang) {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=${lang}-US&page=1`
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${token}`
    }}

    const res = await fetch(url, options);
    
    const data = await res.json();
    return data;
}

export async function getDetails(id, lang) {
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
    const data = await res.json();
    const dataVideo = await resVideo.json();

    return {details: data, video: dataVideo.results};   
}


