import { Injectable } from '@angular/core';
import { Movie, TopMovie, TrendingMovies} from '../models/movie';
import { HttpClient } from '@angular/common/http';
import { Observable, concat, map, of, startWith, switchMap, tap } from 'rxjs';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  baseUrl: string = 'https://api.themoviedb.org/3';
  apiKey: string = '27bac42752c910c91a7121f292212cc3';
  constructor(private http: HttpClient) { 
  }

  getMovies(): Observable<Movie[]> {
    return this.http.get<{ results: Movie[] }>(`${this.baseUrl}/discover/movie?api_key=${this.apiKey}`)
      .pipe(
        map(response => response.results)
      );
  }

  getTopRatedMovies(page: number = 1): Observable<TopMovie[]> {
return this.http.get<{results:TopMovie[]}>(`${this.baseUrl}/movie/top_rated?api_key=${this.apiKey}&page=${page}`).pipe(map((res) => res.results.slice(0,10)))
  }

  getMovieId(id: string) {
    return this.http.get<Movie>(
      `${this.baseUrl}/movie/${id}?api_key=${this.apiKey}`
    );
  }

  getTrendingMovies(timeWindow: string='day'): Observable<TrendingMovies[]> {
    return this.http.get<{ results: TrendingMovies[] }>(
      `${this.baseUrl}/trending/movie/${timeWindow}?api_key=${this.apiKey}`
    ).pipe(map((res) => res.results.slice(0, 10)));
  }

}
  

