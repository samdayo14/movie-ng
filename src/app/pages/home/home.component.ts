import {  Component, signal} from '@angular/core';
import { Movie, TopMovie, TrendingMovies, UpcomingMovies, } from '../../models/movie';
import { AsyncPipe, NgClass, NgFor} from '@angular/common';
import { MovieService } from '../../services/movie.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { MovieCardComponent } from '../../component/movie-card/movie-card.component';
import { ActivatedRoute, RouterLink } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor,AsyncPipe,MovieCardComponent, RouterLink,NgClass],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent{ 
  protected timeWindow:String= 'day';
  protected item$: Observable<Movie[]> = this.service.getMovies();
  protected movie$: BehaviorSubject<TopMovie[]> = new BehaviorSubject<TopMovie[]>([]);
  protected trendingMovies$:BehaviorSubject<TrendingMovies[]> = new BehaviorSubject<TrendingMovies[]>([]);
  protected upcomingMovies$:BehaviorSubject<UpcomingMovies[]> = new BehaviorSubject<UpcomingMovies[]>([])
  private currentPage = signal(1);
  

  constructor(private readonly service:MovieService,private route:ActivatedRoute){
    this.loadMore();
    this.loadTrending();
    this.loadUpcoming()
  }


  protected handleLoadMore(): void {
    switch (this.selectedTab) {
      case 'Top Rated':
        this.loadMore();
        break;
      case 'Trending':
        this.loadTrending();
        break;
      case 'Upcoming':
        this.loadUpcoming();
        break;
    }
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

 protected loadTrending(){
  this.service.getTrendingMovies(`${this.timeWindow}`,this.currentPage()).subscribe(
    (res) => {
      const currentMovies = this.trendingMovies$.value;
      this.trendingMovies$.next([...currentMovies, ...res]);
      this.currentPage.update((value) => value + 1);
    },
  );
  }

  protected loadUpcoming(){
    this.service.getUpcomingMovies(this.currentPage()).subscribe(
      (res) => {
        const currentMovies = this.upcomingMovies$.value;
        this.upcomingMovies$.next([...currentMovies, ...res]);
        this.currentPage.update((value) => value + 1);
      },
    );
  }

  
  protected routes = [
    {
      route:'Top Rated'
    },
    {
      route:'Trending'
    },
    {
      route:'Upcoming'
    },
  ];


 protected top_rated:boolean=true;
 protected upcoming:boolean=true;
 protected trending:boolean=true;
 protected selectedTab = 'Top Rated';
  protected openTab(tab:string){
 this.selectedTab = tab
  }

}

