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
  private currentPage = signal(1);
  protected movie$:Observable<TopMovie[]> | undefined;
  protected trendingMovies$:Observable<TrendingMovies[]> | undefined;
  protected upcomingMovies$:Observable<UpcomingMovies[]> | undefined
  

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
      this.currentPage.update((value) => value + 1);
      this.movie$ = this.service.getTopRatedMovies(this.currentPage());
  }
  

 protected loadTrending(){
  this.currentPage.update((value) => value + 1);
  this.trendingMovies$ = this.service.getTrendingMovies(`${this.timeWindow}`, this.currentPage())
  }

  protected loadUpcoming(){
    this.currentPage.update((value) => value + 1);
    this.upcomingMovies$ = this.service.getUpcomingMovies(this.currentPage())
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

