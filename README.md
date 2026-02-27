# ShiftScheduler — Angular Frontend

A multi-tenant workforce management and shift scheduling web application built with Angular 17. Enables organizations to manage workers, create shift schedules, define business rules, track absences, and configure holidays.

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | Angular 17.2 |
| UI Components | Angular Material 17.2, Bootstrap 5.3 |
| Calendar | angular-calendar 0.31 + date-fns |
| Authentication | JWT (HttpOnly cookies) + jwt-decode |
| Export | exceljs, html-to-image, file-saver |
| SSR | Angular Universal + Express |
| Internationalization | Angular i18n (XLIFF) |
| Testing | Karma + Jasmine |

---

## Prerequisites

- Node.js 18.18.0+
- npm 9+
- Angular CLI 17

---

## Getting Started

```bash
npm install
ng serve
```

The app runs on `http://localhost:4200` and connects to the API at `http://localhost:5265/api/` by default.

---

## Available Scripts

| Script | Description |
|---|---|
| `ng serve` | Start development server |
| `ng serve --configuration staging` | Start against staging API |
| `ng build` | Build for production (all locales) |
| `ng build --configuration development` | Build for development |
| `ng build --configuration staging` | Build for staging |
| `ng test` | Run unit tests |
| `npm run serve:ssr:ShiftSchedulerAngular` | Serve SSR build |

### Localized Builds

```bash
ng build --configuration fr   # French
ng build --configuration es   # Spanish
ng build --configuration de   # German
ng build --configuration it   # Italian
ng build --configuration pt   # Portuguese
```

---

## Project Structure

```
src/app/
├── core/                        # App-wide singletons
│   ├── guards/                  # authGuard (JWT check)
│   ├── interceptors/            # Auth + error handling (token refresh)
│   └── services/
│       ├── api/                 # HTTP services (one per domain)
│       └── ui/                  # Loading spinner, snackbar, sidebar
│
├── modules/                     # Feature pages (routed)
│   ├── home/                    # Public landing page
│   ├── login/                   # Login
│   ├── dashboard/               # Authenticated shell (container)
│   ├── dashboard-home/          # Entity list / overview
│   ├── entity-workers/          # Worker management
│   ├── entity-schedule/         # Schedule calendar
│   ├── entity-shifts/           # Shift templates & rotations
│   ├── entity-rules/            # Business rules
│   ├── entity-absences/         # Worker absences
│   ├── entity-holidays/         # Holiday management
│   ├── profile/                 # User profile
│   ├── settings/                # User settings
│   ├── helpdocs/                # Help documentation
│   └── [auth pages]/            # Register, confirm-email, reset-password
│
└── shared/
    ├── components/              # Reusable UI (header, sidebar, dialogs, snackbars)
    ├── constants/               # API paths, routes, UI text
    ├── models/
    │   ├── DTOs/
    │   │   ├── Incoming/        # API response models
    │   │   └── Outgoing/        # API request models
    │   └── VM/                  # View models (composed for components)
    └── directives/ & pipes/
```

---

## Routing

### Public Routes

| Path | Component |
|---|---|
| `/` | Home |
| `/login` | Login |
| `/reset-password` | Reset Password |
| `/confirm-email` | Email Confirmation |
| `/terms-conditions` | Terms |
| `/privacy-policy` | Privacy Policy |

### Protected Routes (requires authentication)

| Path | Component |
|---|---|
| `/dashboard/home` | Dashboard Home |
| `/dashboard/entity-workers/:entityId` | Worker Management |
| `/dashboard/entity-schedule/:entityId` | Schedule Calendar |
| `/dashboard/entity-shifts/:entityId` | Shift Templates |
| `/dashboard/entity-rules/:entityId` | Business Rules |
| `/dashboard/entity-absences/:entityId` | Absences |
| `/dashboard/entity-holidays/:entityId` | Holidays |
| `/dashboard/profile` | User Profile |
| `/dashboard/settings` | Settings |
| `/dashboard/help/*` | Help Docs |

---

## Key Features

- **Authentication** — JWT with HttpOnly cookie storage, automatic token refresh on 401, email verification flow
- **Multi-tenancy** — Users can belong to multiple organizations; all entity-specific routes are scoped by `:entityId`
- **Schedule Management** — Calendar view (angular-calendar), worker assignment, rule validation, export to Excel and image
- **Shift Templates** — Configurable shifts with breaks and rotation patterns
- **Business Rules** — Define and validate scheduling constraints per organization
- **Absence Management** — Log, approve, and reject worker absences; integrated with schedule generation
- **Holiday Management** — Configure holidays (catalog-based or custom) with behaviour settings; considered during schedule generation
- **Internationalization** — 6 languages (EN, FR, ES, DE, IT, PT) via Angular i18n with `Accept-Language` header sent to API

---

## Architecture Notes

### HTTP Layer
Two interceptors are active globally:
- `AuthInterceptor` — Attaches `withCredentials: true` and `Accept-Language` header to every request
- `AuthErrorInterceptor` — Catches 401 responses, attempts a token refresh once, then retries; redirects to login on persistent failure

### API Services
Each domain has a dedicated service under `core/services/api/`. Services use `async/await` and return typed DTOs. URLs are centralized in `shared/constants/APIPathsConstants.ts`.

### State Management
No external state library. Auth state is held in `AuthService` via `BehaviorSubject`. Component-level state is managed locally. UI state (loading, snackbars) is managed through dedicated UI services.

### ViewModel Pattern
Components receive a `ViewModel` from the API on init — a single payload that contains all data the view needs (lists, flags, paginated results). This minimizes the number of API calls per page load.

---

## Environments

| File | Target |
|---|---|
| `environment.ts` | Local (`http://localhost:5265/api/`) |
| `environment.staging.ts` | Azure staging |
| `environment.prod.ts` | Production |

---

## Internationalization

Translation files are located in `src/locale/` in XLIFF format. To extract new translation keys:

```bash
ng extract-i18n
```
