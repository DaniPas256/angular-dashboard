import { Routes } from '@angular/router';

export const snippetsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./snippets-layout/snippets-layout.component').then(
        (m) => m.SnippetsLayoutComponent,
      ),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'form-builder' },
      {
        path: 'form-builder',
        loadComponent: () =>
          import('./snippet-category-page/snippet-category-page.component').then(
            (m) => m.SnippetCategoryPageComponent,
          ),
        data: { snippetId: 'form-builder' },
      },
      {
        path: 'http-interceptor-jwt',
        loadComponent: () =>
          import('./snippet-category-page/snippet-category-page.component').then(
            (m) => m.SnippetCategoryPageComponent,
          ),
        data: { snippetId: 'http-interceptor-jwt' },
      },
      {
        path: 'auth-guard',
        loadComponent: () =>
          import('./snippet-category-page/snippet-category-page.component').then(
            (m) => m.SnippetCategoryPageComponent,
          ),
        data: { snippetId: 'auth-guard' },
      },
      {
        path: 'pipe',
        loadComponent: () =>
          import('./snippet-category-page/snippet-category-page.component').then(
            (m) => m.SnippetCategoryPageComponent,
          ),
        data: { snippetId: 'pipe' },
      },
      {
        path: 'directive',
        loadComponent: () =>
          import('./snippet-category-page/snippet-category-page.component').then(
            (m) => m.SnippetCategoryPageComponent,
          ),
        data: { snippetId: 'directive' },
      },
      {
        path: 'signals-effects-model',
        loadComponent: () =>
          import('./snippet-category-page/snippet-category-page.component').then(
            (m) => m.SnippetCategoryPageComponent,
          ),
        data: { snippetId: 'signals-effects-model' },
      },
      {
        path: 'rxjs-operators',
        loadComponent: () =>
          import('./snippet-category-page/snippet-category-page.component').then(
            (m) => m.SnippetCategoryPageComponent,
          ),
        data: { snippetId: 'rxjs-operators' },
      },
      {
        path: 'ngrx-overview',
        loadComponent: () =>
          import('./snippet-category-page/snippet-category-page.component').then(
            (m) => m.SnippetCategoryPageComponent,
          ),
        data: { snippetId: 'ngrx-overview' },
      },
    ],
  },
];
