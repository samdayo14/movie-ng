import {  Component,} from '@angular/core';
import { Movie, TopMovie, } from '../../models/movie';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { MovieService } from '../../services/movie.service';
import { BehaviorSubject, Observable, of, switchMap, } from 'rxjs';
import { MovieCardComponent } from '../../component/movie-card/movie-card.component';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf,NgFor,AsyncPipe,MovieCardComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent{ 
  protected item$: Observable<Movie[]> = this.service.getMovies();
  protected movie$: BehaviorSubject<TopMovie[]> = new BehaviorSubject<TopMovie[]>([]);
  private currentPage = 1

  constructor(private readonly service:MovieService){
    this.loadMore()
  }
 
  protected loadMore() {
    this.service.getTopRatedMovies(this.currentPage).subscribe(
      (res) => {
        const currentMovies = this.movie$.value;
        this.movie$.next([...currentMovies, ...res]);
        this.currentPage++;
      },
    );
  }
  

}

