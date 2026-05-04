import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminLayoutComponent } from './core/layout/admin-layout.component';
import { UserResolve } from './features/user-data/resolvers/user-data.resolver';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./features/dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'users',
        resolve: { users: UserResolve },
        loadChildren: () =>
          import('./features/user-data/user-data.module').then((m) => m.UserDataModule),
      },
      {
        path: 'snippets',
        loadChildren: () =>
          import('./features/code-snippets/snippets.module').then((m) => m.SnippetsModule),
      },
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
