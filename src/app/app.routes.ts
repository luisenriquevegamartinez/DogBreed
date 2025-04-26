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
    path: '**',
    pathMatch: 'full',
    redirectTo: 'list',
  }
];
