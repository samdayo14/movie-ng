import { Component } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Movie, MovieCredit, MovieVideo } from '../../models/movie';
import { Observable } from 'rxjs';
import { AsyncPipe, CurrencyPipe, DatePipe,UpperCasePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { VideoComponent } from '../../component/video/video.component';
@Component({
  selector: 'app-movie-id',
  standalone: true,
  imports: [AsyncPipe,DatePipe,UpperCasePipe,CurrencyPipe,VideoComponent],
  templateUrl: './movie-id.component.html',
  styleUrl: './movie-id.component.scss'
})
export class MovieIdComponent {
  protected id:String = '' 
  protected movieId$:Observable<Movie> =this.service.getMovieId(`${this.id}`)
  protected movieCredits$:Observable<MovieCredit> = this.service.getMovieCredits(`${this.id}`)
  protected movieVideo$: Observable<MovieVideo[]> = this.service.getMovieVideo(`${this.id}`);
  constructor(private readonly service:MovieService, private route:ActivatedRoute){}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.movieId$ = this.service.getMovieId(params['id']);
      this.movieCredits$ = this.service.getMovieCredits(params['id']);
      this.movieVideo$ = this.service.getMovieVideo(params['id'])
    });
  }

}
