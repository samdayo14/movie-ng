import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Observable } from 'rxjs';
import { Genre } from '../../models/movie';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-genres',
  standalone: true,
  imports: [AsyncPipe,RouterLink],
  templateUrl: './genres.component.html',
  styleUrl: './genres.component.scss'
})
export class GenresComponent {
  protected id:string= ''
  protected movieGenres$:Observable<Genre[]> = this.service.getMovieGenres();
  protected TvGenres$:Observable<Genre[]> = this.service.getTvGenres();

  constructor(private service:MovieService){}
}
