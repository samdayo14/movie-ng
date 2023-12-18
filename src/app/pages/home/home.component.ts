import {  Component, signal,} from '@angular/core';
import { Movie, TopMovie, } from '../../models/movie';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { MovieService } from '../../services/movie.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { MovieCardComponent } from '../../component/movie-card/movie-card.component';
import { ActivatedRoute, RouterLink } from '@angular/router';



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
  private currentPage = signal(1)


  constructor(private readonly service:MovieService,private route:ActivatedRoute){
    this.loadMore()
  }
 
  protected loadMore() {
    this.service.getTopRatedMovies(this.currentPage()).subscribe(
      (res) => {
        const currentMovies = this.movie$.value;
        this.movie$.next([...currentMovies, ...res]);
        this.currentPage.update((value) => value + 1);
      },
    );
  }
  

}

