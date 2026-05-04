import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './core/layout/admin-layout.component';
import { UserResolve } from './features/user-data/resolvers/user-data.resolver';

export const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./features/dashboard/dashboard-routing.module').then(
            (m) => m.dashboardRoutes,
          ),
      },
      {
        path: 'users',
        resolve: { users: UserResolve },
        loadChildren: () =>
          import('./features/user-data/user-data-routing.module').then(
            (m) => m.userDataRoutes,
          ),
      },
      {
        path: 'snippets',
        loadChildren: () =>
          import('./features/code-snippets/snippets-routing.module').then(
            (m) => m.snippetsRoutes,
          ),
      },
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];
