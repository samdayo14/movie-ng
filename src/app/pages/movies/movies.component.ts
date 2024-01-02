import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable} from 'rxjs';
import {  MoviePage } from '../../models/movie';
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
  protected query:string = '';
  protected genreId:string = ''
  protected searchMovies$: Observable<MoviePage[]> = this.service.getSearchMovies(this.query);
 
  constructor(private fb:FormBuilder, private service:MovieService,private route: ActivatedRoute){
    this.form = this.fb.nonNullable.group({
      search:this.fb.nonNullable.control('')
  })
  }
  

  protected searchMovies(){
    const {search} = this.form.value
    this.searchMovies$ = this.service.getSearchMovies(search);
  }

 protected clearSearch(){
    this.form.reset()
  }
}
