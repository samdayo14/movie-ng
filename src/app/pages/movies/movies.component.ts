import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable, take} from 'rxjs';
import {  Movie, MoviePage } from '../../models/movie';
import { MovieService } from '../../services/movie.service';
import { MovieCardComponent } from '../../component/movie-card/movie-card.component';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [ReactiveFormsModule,MovieCardComponent,AsyncPipe,RouterLink],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss'
})
export class MoviesComponent{
  protected form:FormGroup;
  private query:string = '';
  private genre:string = '';
  protected page:number = 1;
  protected searchMovies$: Observable<MoviePage[]> = this.service.getSearchMovies(this.query);
 
  constructor(private fb:FormBuilder, private service:MovieService,private route: ActivatedRoute){
    this.form = this.fb.nonNullable.group({
      search:this.fb.nonNullable.control('')
  })
  this.route.queryParams.subscribe(params => {
    this.genre = params['genre'] || '';
    this.filterMovies();
});

this.filterMovies()
  }

 
private  filterMovies() {
    this.searchMovies$ = this.service.getSearchMovies(this.genre);
}

  protected searchMovies(){
    const {search} = this.form.value
    this.searchMovies$ = this.service.getSearchMovies(search);
  }

 protected clearSearch(){
    this.form.reset()
  }
}
