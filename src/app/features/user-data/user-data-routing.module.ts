import { Routes } from '@angular/router';

export const userDataRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./user-list-page/user-list-page.component').then(
        (m) => m.UserListPageComponent,
      ),
  },
];
