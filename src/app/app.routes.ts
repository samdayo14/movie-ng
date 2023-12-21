import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TvShowsComponent } from './pages/tv-shows/tv-shows.component';
import { GenresComponent } from './pages/genres/genres.component';
import { MovieIdComponent } from './pages/movie-id/movie-id.component';
import { MoviesComponent } from './pages/movies/movies.component';

export const routes: Routes = [
    {path:'', component:HomeComponent},
    {path:'movies', component:MoviesComponent},
    {path:'tv-shows', component:TvShowsComponent},
    {path:'genres', component:GenresComponent},
    {path:'movie/:id', component:MovieIdComponent},
    { path: '', redirectTo: '', pathMatch: 'full' },
    { path: '**', component: HomeComponent }
];
