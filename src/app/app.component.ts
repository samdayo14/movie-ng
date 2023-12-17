import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomeComponent, RouterOutlet, NgFor, RouterLink, RouterOutlet,RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  protected routes = [
    {
      page:'Movies',
      routerLink:''
    },
    {
      page:'Tv Shows',
      routerLink:'tv-shows'
    },
    {
      page:'Genres',
      routerLink:'genres'
    }
  ]

  protected trackRoute(index: number, route: (typeof this.routes)[0]) {
    return route.page;
  }
}
