# Portfolio Admin (Angular)

Small **admin-style** front-end demo: lazy feature modules, a shared UI kit, Chart.js on the dashboard, a fake user table with reactive forms, and a snippets section with copy + sample code.

## Stack

- Angular **21** (NgModules, strict TypeScript)
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

## Build

```bash
npm run build
```

Output: `dist/portfolio-admin`.

## Tests

```bash
npm test
```
