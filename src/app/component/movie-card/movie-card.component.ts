import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})
export class MovieCardComponent {
  @Input({required:true}) title:string = '';
  @Input({required:true}) image:string = '';
  @Input({required:true}) rating?:number;
 

}
