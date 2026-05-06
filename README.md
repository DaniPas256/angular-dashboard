# Portfolio Admin (Angular)

# Highlights

- Built with zoneless Angular for improved performance and explicit reactivity (no Zone.js)
- Modern architecture based on standalone components (no NgModules)
- State management implemented with functional store and Angular Signals
- Functional route resolvers (ResolveFn) with inject() for preloading data before navigation
- Proper handling of reactive context using runInInjectionContext
- Custom form controls using ControlValueAccessor (CVA) for Reactive Forms integration
- Reactive Forms for user management
- Unit testing setup using Jest

[DEMO](https://danipas256.github.io/angular-dashboard/dashboard)

Small **admin-style** front-end demo: lazy feature modules, a shared UI kit, Chart.js on the dashboard, a fake user table with reactive forms, and a snippets section with copy + sample code.

## Stack

- Angular **21** (strict TypeScript)
- SCSS tokens + light/dark toggle (`ThemeUiService`, `localStorage`)
- [Chart.js](https://www.chartjs.org/) + [ng2-charts](https://github.com/valor-software/ng2-charts)

## Run locally

```bash
npm install
npm start
```

Then open `http://localhost:4200/`. Main routes: `/dashboard`, `/users`, `/snippets` (e.g. `/snippets/form-builder`, `/snippets/rxjs-operators`).

## Structure

- `src/app/core` — layout shell, theme service
- `src/app/shared` — UI primitives (`app-button`, `app-input`, `app-select`, `app-table`, `app-card`, `app-modal`, `app-pagination`, `app-skeleton`), `appFilter` pipe, `appHighlight` / `appDebounceInput`
- `src/app/features/dashboard` — placeholder KPIs + line / bar / pie charts
- `src/app/features/user-data` — table + debounced filter + sort + pagination + modal CRUD; data in `localStorage`
- `src/app/features/code-snippets` — sidebar categories + page body from `snippet-pages.data.ts` / `SnippetsCatalogService`
