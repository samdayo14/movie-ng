

  export interface MoviePage {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
    title:string;
    backdrop_path: string; 
    vote_average: number;
    vote_count: number;
  }
  

export interface TopMovie {
adult:boolean;
backdrop_path:string;
genre_ids:number[]
original_language:string;
original_title:string;
id:number;
overview:string;
popularity:number;
poster_path:string;
release_date:string;
title:string;
video:boolean;
vote_average:number;
vote_count:number
}
   
 export interface Movie {
    adult: boolean;
    backdrop_path: string; 
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    revenue:number;
    runtime:number;
    status:string;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  }
  
  export interface TrendingMovies {
adult:boolean,
backdrop_path:string,
id:number,
title:string,
original_language:string,
original_title:string,
overview:string,
poster_path:string,
media_type:string,
genre_ids:number[],
popularity:number,
release_date:string,
video:boolean,
vote_average:number,
vote_count:number
  }

  export interface UpcomingMovies {
adult:boolean,
backdrop_path:string,
genre_ids:number[]
id:number,
original_language:string,
original_title:string,
overview:string,
popularity:number,
poster_path:string;
release_date:string,
title:string,
video:boolean,
vote_average:number,
vote_count:number
  }

  export interface MovieCredit {
    cast: {
      name: string;
      profile_path: string;
    }[];  
  }
