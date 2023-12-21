import { Injectable } from '@angular/core';
import { Movie, MovieCredit, MoviePage, TopMovie, TrendingMovies, UpcomingMovies} from '../models/movie';
import { HttpClient } from '@angular/common/http';
import { Observable, map} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MovieService {
  baseUrl: string = 'https://api.themoviedb.org/3';
  apiKey: string = '27bac42752c910c91a7121f292212cc3';
  constructor(private http: HttpClient) { 
  }

 public getMovies(): Observable<Movie[]> {
    return this.http.get<{ results: Movie[] }>(`${this.baseUrl}/discover/movie?api_key=${this.apiKey}`)
      .pipe(
        map(response => response.results)
      );
  }

 public getTopRatedMovies(page: number = 1): Observable<TopMovie[]> {
return this.http.get<{results:TopMovie[]}>(`${this.baseUrl}/movie/top_rated?api_key=${this.apiKey}&page=${page}`).pipe(map((res) => res.results.slice(0,10)))
  }

 public getMovieId(id: string) {
    return this.http.get<Movie>(
      `${this.baseUrl}/movie/${id}?api_key=${this.apiKey}`
    );
  }

 public getTrendingMovies(timeWindow: string='day'): Observable<TrendingMovies[]> {
    return this.http.get<{ results: TrendingMovies[] }>(
      `${this.baseUrl}/trending/movie/${timeWindow}?api_key=${this.apiKey}`
    ).pipe(map((res) => res.results.slice(0, 10)));
  }

public  getUpcomingMovies():Observable<UpcomingMovies[]>{
    return this.http.get<{results: UpcomingMovies[]}>(`${this.baseUrl}/movie/upcoming?api_key=${this.apiKey}`).pipe(map((res) => res.results.slice(0,10)))
  }

public getMovieCredits(id:string):Observable<MovieCredit> {
  return this.http.get<MovieCredit>(`${this.baseUrl}/movie/${id}/credits?api_key=${this.apiKey}`)
}

public getSearchMovies(query: string): Observable<MoviePage[]> {
   const uri = query ? '/search/movie' : '/movie/popular';
  return this.http.get<{ results: MoviePage[] }>(`${this.baseUrl}${uri}?api_key=${this.apiKey}&query=${query}`)
    .pipe(
      map((res) => {
        return res.results;
      })
    );
}



}
  

