import { Injectable } from '@angular/core';
import { GenresDto, Genre, Movie, MovieCredit, MoviePage, SearchTv, TopMovie, TrendingMovies, UpcomingMovies, MovieVideo} from '../models/movie';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of, switchMap} from 'rxjs';


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

  public getTvId(id: string) {
    return this.http.get<SearchTv>(
      `${this.baseUrl}/tv/${id}?api_key=${this.apiKey}`
    );
  }

 public getTrendingMovies(timeWindow: string='day', page:number): Observable<TrendingMovies[]> {
    return this.http.get<{ results: TrendingMovies[] }>(
      `${this.baseUrl}/trending/movie/${timeWindow}?api_key=${this.apiKey}&page=${page}`
    ).pipe(map((res) => res.results.slice(0, 10)));
  }

public  getUpcomingMovies(page:number):Observable<UpcomingMovies[]>{
    return this.http.get<{results: UpcomingMovies[]}>(`${this.baseUrl}/movie/upcoming?api_key=${this.apiKey}&page=${page}`).pipe(map((res) => res.results.slice(0,10)))
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

public getSearchTv(query:String):Observable<SearchTv[]> {
  const uri = query ? '/search/tv' : '/tv/popular';
  return this.http.get<{results:SearchTv[]}>(`${this.baseUrl}${uri}?api_key=${this.apiKey}&query=${query}`).pipe(map((res) => res.results))
}

public getTvCredits(id:string):Observable<MovieCredit> {
  return this.http.get<MovieCredit>(`${this.baseUrl}/tv/${id}/credits?api_key=${this.apiKey}`)
}


public getMovieGenres(): Observable<Genre[]> {
  return this.http.get<{ genres: Genre[] }>(`${this.baseUrl}/genre/movie/list?api_key=${this.apiKey}`)
    .pipe(
      map((res) =>
         res.genres
      )
    );
}

getMoviesByGenre(genreId: string, page: number) {
  return this.http
    .get<{results:Movie[]}>(
      `${this.baseUrl}/discover/movie?with_genres=${genreId}&page=${page}&api_key=${this.apiKey}`
    )
    .pipe(
     map((res) => res.results)
    );
}


public getTvGenres(): Observable<Genre[]> {
  return this.http.get<{ genres: Genre[] }>(`${this.baseUrl}/genre/tv/list?api_key=${this.apiKey}`)
    .pipe(
      map((res) =>
         res.genres
      )
    );
}

public getMovieVideo(id:string):Observable<MovieVideo[]> {
  return this.http.get<{results:MovieVideo[]}>(`${this.baseUrl}/movie/${id}/videos?api_key=${this.apiKey}`).pipe(map((res) => res.results.slice(0,5)))
}

public getTvVideo(id:string):Observable<MovieVideo[]> {
  return this.http.get<{results:MovieVideo[]}>(`${this.baseUrl}/tv/${id}/videos?api_key=${this.apiKey}`).pipe(map((res) => res.results.slice(0,5)))
}

}
  

