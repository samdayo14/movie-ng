import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NgFor, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomeComponent, RouterOutlet, NgFor, RouterLink, RouterOutlet,RouterLinkActive,NgTemplateOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  protected displayNav = signal(false)

protected openNav(){
  this.displayNav.set(true)
}

protected closeNav(){
  this.displayNav.set(false)
}

  protected routes = [
    {
      page:'Home',
      routerLink:''
    },
    {
      page:'Movies',
      routerLink:'movies'
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
