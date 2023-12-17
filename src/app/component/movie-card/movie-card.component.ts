import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})
export class MovieCardComponent {
  @Input({required:true}) title:string = '';
  @Input({required:true}) image:string = '';
  @Input({required:true}) rating?:number;
  constructor(){}

}
