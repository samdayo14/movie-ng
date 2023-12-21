import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { Movie, MoviePage } from '../../models/movie';
import { MovieService } from '../../services/movie.service';
import { MovieCardComponent } from '../../component/movie-card/movie-card.component';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [ReactiveFormsModule,NgFor,MovieCardComponent,AsyncPipe,NgIf],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss'
})
export class MoviesComponent{
  protected form:FormGroup;
  protected query:string = '';
  protected searchMovies$: Observable<MoviePage[]> = this.service.getSearchMovies(this.query)
 
  constructor(private fb:FormBuilder, private service:MovieService){
    this.form = this.fb.nonNullable.group({
      search:this.fb.nonNullable.control('')
  })
 
  }
  protected searchMovies(){
    const {search} = this.form.value
    this.searchMovies$ = this.service.getSearchMovies(search)
  }

 protected clearSearch(){
    this.form.reset()
  }
}
