import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list',
  },
  {
    path: 'list',
    loadComponent: () =>
      import('./features/bred-list/bred-list.component').then((c) => c.BredListComponent),
  },
  {
    path: 'picture/:breed',
    loadComponent: () =>
      import('./features/breed-picture/breed-picture.component').then((c) => c.BreedPictureComponent),
  },
  {
    path: 'picture/:breed/:subBreed',
    loadComponent: () =>
      import('./features/breed-picture/breed-picture.component').then((c) => c.BreedPictureComponent),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'list',
  }
];
