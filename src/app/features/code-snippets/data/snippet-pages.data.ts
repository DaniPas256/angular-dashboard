import type { SnippetPageContent } from '../models/snippet-content.model';

/** Snippet copy + sample code (backticks in code strings escaped as \`) */
export const SNIPPET_PAGES: Record<string, SnippetPageContent> = {
  'form-builder': {
    title: 'FormBuilder',
    lead:
      'Reactive forms without hand-rolling every control: group fields, attach validators, keep TypeScript happy with `nonNullable` when defaults are always set.',
    sections: [
      {
        heading: 'Why bother with FormBuilder',
        paragraphs: [
          'You get a `FormGroup` (or `FormArray`) instead of a pile of loose `FormControl`s. Easier to reset, patch, and unit-test, and adding a dynamic row is less painful.',
        ],
      },
      {
        heading: 'Small profile form',
        paragraphs: [
          '`nonNullable` is nice when empty string is a real value and you do not want `null` creeping into the type.',
        ],
        codeBlocks: [
          {
            language: 'typescript',
            code: `import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profile-form.component.html',
})
export class ProfileFormComponent {
  private readonly fb = inject(FormBuilder);

  readonly profileForm = this.fb.nonNullable.group({
    displayName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    bio: ['', Validators.maxLength(500)],
  });

  onSubmit(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }
    const payload = this.profileForm.getRawValue();
    // wire up to your API
  }
}`,
          },
        ],
      },
      {
        heading: 'Template bit',
        paragraphs: [
          'Remember `ReactiveFormsModule` on the component (or module) that owns the template.',
        ],
        codeBlocks: [
          {
            language: 'html',
            code: `<form [formGroup]="profileForm" (ngSubmit)="onSubmit()">
  <input formControlName="displayName" />
  @if (profileForm.controls.displayName.touched && profileForm.controls.displayName.errors?.['required']) {
    <span>Name is required</span>
  }
  <button type="submit">Save</button>
</form>`,
          },
        ],
      },
    ],
  },

  'http-interceptor-jwt': {
    title: 'HTTP interceptor + JWT (inject)',
    lead:
      'Angular 15+ can use a plain `HttpInterceptorFn` and `inject()` — no class, no constructor boilerplate.',
    sections: [
      {
        heading: 'What it does',
        paragraphs: [
          'Every outgoing request passes through the interceptor chain. Here we clone the request and attach `Authorization` if we have a token.',
          'The token should come from a small service (memory, refresh flow, whatever your auth story is) — not from a string literal in source.',
        ],
      },
      {
        heading: 'Interceptor',
        codeBlocks: [
          {
            language: 'typescript',
            code: `import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

export const authJwtInterceptor: HttpInterceptorFn = (request, next) => {
  const tokenService = inject(AuthTokenService);
  const token = tokenService.getAccessToken();

  if (!token) {
    return next(request);
  }

  const authorized = request.clone({
    setHeaders: { Authorization: \`Bearer \${token}\` },
  });

  return next(authorized);
};

// e.g. provideHttpClient(withInterceptors([authJwtInterceptor]))`,
          },
        ],
      },
      {
        heading: 'Token service stub',
        paragraphs: [
          'Swap the storage line for whatever you actually use: sessionStorage, an auth facade, BFF cookie, etc.',
        ],
        codeBlocks: [
          {
            language: 'typescript',
            code: `import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthTokenService {
  getAccessToken(): string | null {
    return sessionStorage.getItem('access_token');
  }
}`,
          },
        ],
      },
    ],
  },

  'auth-guard': {
    title: 'Auth guard',
    lead: 'Functional route guard: `CanActivateFn`, `inject`, and a stream from your auth layer.',
    sections: [
      {
        heading: 'Functional guard',
        paragraphs: [
          'Return `false` to block navigation, or a `UrlTree` to redirect without a full page reload.',
        ],
        codeBlocks: [
          {
            language: 'typescript',
            code: `import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (): Observable<boolean | UrlTree> => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.isLoggedIn$.pipe(
    take(1),
    map((isLoggedIn) =>
      isLoggedIn ? true : router.createUrlTree(['/login'], { queryParams: { returnUrl: router.url } }),
    ),
  );
};

// { path: 'app', canActivate: [authGuard], loadChildren: ... }`,
          },
        ],
      },
      {
        heading: 'AuthService sketch',
        paragraphs: [
          '`take(1)` matters so the guard does not hang. If you prefer signals, you can bridge with `toSignal` and return a boolean synchronously — just keep the contract clear.',
        ],
        codeBlocks: [
          {
            language: 'typescript',
            code: `import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly loggedIn = new BehaviorSubject(false);

  readonly isLoggedIn$: Observable<boolean> = this.loggedIn.asObservable();

  login(): void {
    this.loggedIn.next(true);
  }

  logout(): void {
    this.loggedIn.next(false);
  }
}`,
          },
        ],
      },
    ],
  },

  pipe: {
    title: 'Pipe',
    lead: 'Thin `transform` wrapper for the template — dates, money, trimming long text.',
    sections: [
      {
        heading: 'Standalone pipe',
        paragraphs: [
          'Pipes are pure by default, so Angular memoizes the output for the same inputs.',
        ],
        codeBlocks: [
          {
            language: 'typescript',
            code: `import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true,
  pure: true,
})
export class TruncatePipe implements PipeTransform {
  transform(value: string | null | undefined, maxLength = 80): string {
    if (!value) {
      return '';
    }
    return value.length <= maxLength ? value : \`\${value.slice(0, maxLength)}…\`;
  }
}`,
          },
        ],
      },
      {
        heading: 'Usage',
        codeBlocks: [
          {
            language: 'html',
            code: `<p>{{ longDescription | truncate : 120 }}</p>`,
          },
        ],
      },
    ],
  },

  directive: {
    title: 'Directive',
    lead: 'Hang behaviour off a host element — highlight, click tracking, cheap DOM tweaks.',
    sections: [
      {
        heading: 'Click passthrough',
        codeBlocks: [
          {
            language: 'typescript',
            code: `import { Directive, HostListener, output } from '@angular/core';

@Directive({
  selector: '[appTrackClick]',
  standalone: true,
})
export class TrackClickDirective {
  readonly tracked = output<MouseEvent>();

  @HostListener('click', ['$event'])
  onHostClick(event: MouseEvent): void {
    this.tracked.emit(event);
  }
}`,
          },
        ],
      },
      {
        heading: 'Template',
        codeBlocks: [
          {
            language: 'html',
            code: `<button type="button" appTrackClick (tracked)="onTracked($event)">
  Save
</button>`,
          },
        ],
      },
    ],
  },

  'signals-effects-model': {
    title: 'Signals: effect + model()',
    lead: '`computed` / `effect` for local state, `model()` when parent and child should share a value without boilerplate.',
    sections: [
      {
        heading: 'effect + side effects',
        paragraphs: [
          'Runs when any signal read inside it changes. Good for persisting UI prefs; if you write to other signals in the same effect, reach for `untracked` so you do not recurse by accident.',
        ],
        codeBlocks: [
          {
            language: 'typescript',
            code: `import { Component, effect, signal } from '@angular/core';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  template: \`<button type="button" (click)="darkMode.update((v) => !v)">Toggle</button>\`,
})
export class ThemeToggleComponent {
  readonly darkMode = signal(false);

  constructor() {
    effect(() => {
      const isDark = this.darkMode();
      document.documentElement.classList.toggle('theme-dark', isDark);
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }
}`,
          },
        ],
      },
      {
        heading: 'model()',
        paragraphs: [
          'Parent uses `[(title)]` on the child; inside the child, `title = model(...)` exposes a writable signal.',
        ],
        codeBlocks: [
          {
            language: 'typescript',
            code: `import { Component, model } from '@angular/core';

@Component({
  selector: 'app-editable-heading',
  standalone: true,
  template: \`
    <input
      type="text"
      [value]="title()"
      (input)="title.set($any($event.target).value)"
    />
  \`,
})
export class EditableHeadingComponent {
  /** Two-way binding from parent: [(title)]="dashboardTitle" */
  readonly title = model('Section title');
}`,
          },
        ],
      },
      {
        heading: 'Parent',
        codeBlocks: [
          {
            language: 'html',
            code: `<app-editable-heading [(title)]="dashboardTitle" />`,
          },
        ],
      },
    ],
  },

  'rxjs-operators': {
    title: 'RxJS operators',
    lead: 'Patterns that show up constantly with HTTP, forms, and user input.',
    sections: [
      {
        heading: 'map / filter / tap',
        paragraphs: [
          '`map` reshapes values, `filter` drops what you do not want, `tap` is for logging or metrics without changing the stream.',
        ],
        codeBlocks: [
          {
            language: 'typescript',
            code: `import { map, filter, tap } from 'rxjs/operators';

source$.pipe(
  filter((id) => id > 0),
  map((id) => ({ userId: id })),
  tap((payload) => console.debug('request', payload)),
);`,
          },
        ],
      },
      {
        heading: 'switchMap',
        paragraphs: [
          'When search text changes fast, `switchMap` unsubscribes the previous inner observable — you only handle the latest response.',
        ],
        codeBlocks: [
          {
            language: 'typescript',
            code: `import { switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';

this.searchControl.valueChanges.pipe(
  debounceTime(300),
  distinctUntilChanged(),
  switchMap((query) => this.api.searchUsers(query)),
);`,
          },
        ],
      },
      {
        heading: 'catchError',
        codeBlocks: [
          {
            language: 'typescript',
            code: `import { catchError, of } from 'rxjs';

this.http.get<User[]>('/api/users').pipe(
  catchError((err) => {
    this.toast.showError(err);
    return of([] as User[]);
  }),
);`,
          },
        ],
      },
      {
        heading: 'combineLatest / forkJoin',
        paragraphs: [
          '`combineLatest` fires when any input changes — handy for paired filters. `forkJoin` waits for parallel HTTP calls and gives you one object when all complete.',
        ],
        codeBlocks: [
          {
            language: 'typescript',
            code: `import { combineLatest, forkJoin } from 'rxjs';

combineLatest([this.role$, this.region$]).pipe(
  map(([role, region]) => ({ role, region })),
);

forkJoin({
  users: this.http.get<User[]>('/api/users'),
  roles: this.http.get<Role[]>('/api/roles'),
}).pipe(map(({ users, roles }) => this.merge(users, roles)));`,
          },
        ],
      },
      {
        heading: 'takeUntil teardown',
        codeBlocks: [
          {
            language: 'typescript',
            code: `import { Subject, takeUntil } from 'rxjs';

private readonly destroy$ = new Subject<void>();

ngOnInit(): void {
  this.poll$.pipe(takeUntil(this.destroy$)).subscribe();
}

ngOnDestroy(): void {
  this.destroy$.next();
  this.destroy$.complete();
}`,
          },
        ],
      },
    ],
  },

  'ngrx-overview': {
    title: 'NgRx',
    lead:
      'Store is Redux-shaped: one serializable state tree, events as actions, pure reducers, selectors for derived data.',
    sections: [
      {
        heading: 'When it pays off',
        paragraphs: [
          'Lots of unrelated screens reading the same slice of state, strict data flow, devtools / time-travel debugging.',
          'For one screen or a single form, a service + signals (or `@ngrx/component-store`) is usually less ceremony.',
        ],
      },
      {
        heading: 'Actions + reducer',
        codeBlocks: [
          {
            language: 'typescript',
            code: `import { createActionGroup, emptyProps, props, createReducer, on } from '@ngrx/store';

export const UserListActions = createActionGroup({
  source: 'User List',
  events: {
    'Load Users': emptyProps(),
    'Load Users Success': props<{ users: User[] }>(),
    'Load Users Failure': props<{ error: string }>(),
  },
});

export interface UserListState {
  users: User[];
  loading: boolean;
  error: string | null;
}

export const initialState: UserListState = {
  users: [],
  loading: false,
  error: null,
};

export const userListReducer = createReducer(
  initialState,
  on(UserListActions.loadUsers, (state) => ({ ...state, loading: true, error: null })),
  on(UserListActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    loading: false,
    users,
  })),
  on(UserListActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);`,
          },
        ],
      },
      {
        heading: 'Effect',
        paragraphs: [
          '`loadUsers$` listens for the load action, calls the API, then dispatches success or failure.',
        ],
        codeBlocks: [
          {
            language: 'typescript',
            code: `import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class UserListEffects {
  private readonly actions$ = inject(Actions);
  private readonly api = inject(UserApiService);

  readonly loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserListActions.loadUsers),
      switchMap(() =>
        this.api.getAll().pipe(
          map((users) => UserListActions.loadUsersSuccess({ users })),
          catchError((error) =>
            of(UserListActions.loadUsersFailure({ error: error.message ?? 'Unknown error' })),
          ),
        ),
      ),
    ),
  );
}`,
          },
        ],
      },
      {
        heading: 'Container component',
        codeBlocks: [
          {
            language: 'typescript',
            code: `import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-user-list-container',
  standalone: true,
  template: \`<!-- bind users$ / loading$ in template -->\`,
})
export class UserListContainerComponent {
  private readonly store = inject(Store);

  readonly users$ = this.store.select(selectAllUsers);
  readonly loading$ = this.store.select(selectUserListLoading);

  ngOnInit(): void {
    this.store.dispatch(UserListActions.loadUsers());
  }
}`,
          },
        ],
      },
    ],
  },
};
