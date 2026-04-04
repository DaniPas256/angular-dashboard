import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SnippetCategoryPageComponent } from './snippet-category-page/snippet-category-page.component';
import { SnippetsLayoutComponent } from './snippets-layout/snippets-layout.component';

const routes: Routes = [
  {
    path: '',
    component: SnippetsLayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'form-builder' },
      {
        path: 'form-builder',
        component: SnippetCategoryPageComponent,
        data: { snippetId: 'form-builder' },
      },
      {
        path: 'http-interceptor-jwt',
        component: SnippetCategoryPageComponent,
        data: { snippetId: 'http-interceptor-jwt' },
      },
      {
        path: 'auth-guard',
        component: SnippetCategoryPageComponent,
        data: { snippetId: 'auth-guard' },
      },
      {
        path: 'pipe',
        component: SnippetCategoryPageComponent,
        data: { snippetId: 'pipe' },
      },
      {
        path: 'directive',
        component: SnippetCategoryPageComponent,
        data: { snippetId: 'directive' },
      },
      {
        path: 'signals-effects-model',
        component: SnippetCategoryPageComponent,
        data: { snippetId: 'signals-effects-model' },
      },
      {
        path: 'rxjs-operators',
        component: SnippetCategoryPageComponent,
        data: { snippetId: 'rxjs-operators' },
      },
      {
        path: 'ngrx-overview',
        component: SnippetCategoryPageComponent,
        data: { snippetId: 'ngrx-overview' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SnippetsRoutingModule {}
