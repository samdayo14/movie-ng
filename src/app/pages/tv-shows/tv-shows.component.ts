import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { SearchTv } from '../../models/movie';
import { MovieService } from '../../services/movie.service';
import { MovieCardComponent } from '../../component/movie-card/movie-card.component';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-tv-shows',
  standalone: true,
  imports: [ReactiveFormsModule,AsyncPipe,MovieCardComponent,RouterLink],
  templateUrl: './tv-shows.component.html',
  styleUrl: './tv-shows.component.scss'
})
export class TvShowsComponent {
  private genre:string = '';
  protected query:string = '';
  protected Tv$:Observable<SearchTv[]> = this.service.getSearchTv(this.query)
  protected form:FormGroup;
  constructor(private fb:FormBuilder, private service:MovieService,private route: ActivatedRoute){
    this.form = this.fb.nonNullable.group({
      search:this.fb.nonNullable.control('')
    })
    this.route.queryParams.subscribe(params => {
      this.genre = params['genre'] || '';
      this.filterTv();
  });
  
  this.filterTv()
  }

  private filterTv(){
    this.Tv$ = this.service.getSearchTv(this.genre)
  }

  protected searchTv(){
    const {search} = this.form.value;
    this.Tv$ = this.service.getSearchTv(search)
  }

  protected clearSearch(){
    this.form.reset()
  }

}
