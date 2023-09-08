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

export interface IError {
    statusText: string
    message: string
}

export interface IUSer {
    id: string | number
    email: string
    createdAt: number
    name?: string
    image?: string
}