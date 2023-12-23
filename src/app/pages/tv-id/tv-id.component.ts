import { AsyncPipe, NgIf,NgFor, CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Observable } from 'rxjs';
import { MovieCredit, SearchTv } from '../../models/movie';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tv-id',
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe,DatePipe,UpperCasePipe,CurrencyPipe],
  templateUrl: './tv-id.component.html',
  styleUrl: './tv-id.component.scss'
})
export class TvIdComponent implements OnInit{
  protected id:string = ''
  protected tvCredits:Observable<MovieCredit> = this.service.getTvCredits(`${this.id}`)
  protected TvId$:Observable<SearchTv>= this.service.getTvId(`${this.id}`)
  constructor(private service:MovieService, private route:ActivatedRoute){}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.TvId$ = this.service.getTvId(params['id']);
      this.tvCredits = this.service.getTvCredits(params['id'])
    });
  }
}
