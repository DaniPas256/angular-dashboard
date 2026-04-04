import { Injectable } from '@angular/core';

export interface SnippetCategory {
  readonly id: string;
  readonly path: string;
  readonly label: string;
  readonly description: string;
}

@Injectable({ providedIn: 'root' })
export class SnippetsCatalogService {
  readonly categories: readonly SnippetCategory[] = [
    {
      id: 'form-builder',
      path: 'form-builder',
      label: 'FormBuilder',
      description: 'Reactive groups, validators, nonNullable typing.',
    },
    {
      id: 'http-interceptor-jwt',
      path: 'http-interceptor-jwt',
      label: 'HTTP + JWT',
      description: 'Functional interceptor, inject(), Bearer header.',
    },
    {
      id: 'auth-guard',
      path: 'auth-guard',
      label: 'Auth guard',
      description: 'CanActivateFn + Router + auth stream.',
    },
    {
      id: 'pipe',
      path: 'pipe',
      label: 'Pipe',
      description: 'Template transform, standalone pipe.',
    },
    {
      id: 'directive',
      path: 'directive',
      label: 'Directive',
      description: 'Host listener, output event.',
    },
    {
      id: 'signals-effects-model',
      path: 'signals-effects-model',
      label: 'Signals',
      description: 'effect(), model(), local state.',
    },
    {
      id: 'rxjs-operators',
      path: 'rxjs-operators',
      label: 'RxJS',
      description: 'switchMap, catchError, combineLatest, teardown.',
    },
    {
      id: 'ngrx-overview',
      path: 'ngrx-overview',
      label: 'NgRx',
      description: 'Actions, reducer, effects, container.',
    },
  ];
}
