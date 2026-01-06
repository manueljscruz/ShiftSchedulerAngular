# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Shift Scheduler Angular is a multi-tenant workforce management and shift scheduling application built with Angular 17.2. The application enables organizations to create schedules, manage workers, define business rules, and track absences.

## Development Commands

### Running the Application
```bash
ng serve                    # Development server (http://localhost:4200)
npm start                   # Alias for ng serve
ng serve --configuration fr # Run with French localization
```

### Building
```bash
ng build                    # Production build with all localizations
ng build --configuration development  # Development build
ng build --configuration fr           # Build only French locale
```

### Testing
```bash
ng test                     # Run all unit tests via Karma
# To run a single test file, modify karma.conf.js to filter specific files
```

### Internationalization
```bash
ng extract-i18n             # Extract translation strings to XLIFF files
```

Supported locales: English (default), French, Spanish, German, Italian, Portuguese
Translation files: `src/locale/messages.{locale}.xlf`

### Server-Side Rendering
```bash
npm run serve:ssr:ShiftSchedulerAngular  # Run SSR server
```

## Architecture

### Module Structure

This is a **module-based Angular application** (not standalone components). All components must be declared in `app.module.ts`.

**Key configuration:**
- `angular.json` schematics enforce non-standalone components/directives/pipes
- All new components require NgModule declaration

### Directory Organization

```
src/app/
├── core/                          # Core application services and configuration
│   ├── services/api/              # API communication services (HTTP calls)
│   ├── services/ui/               # UI-related services (loading, snackbars)
│   └── api-configuration.ts       # API base URL configuration
├── modules/                       # Feature modules (routed components)
│   ├── dashboard/                 # Main authenticated container
│   ├── entity-*/                  # Entity-specific features (workers, shifts, schedule, rules, absences)
│   ├── helpdocs/pages/            # Help documentation sub-routes
│   └── [other features]/
├── shared/
│   ├── components/                # Reusable UI components
│   ├── constants/                 # API path constants and configuration
│   ├── directives/                # Custom directives
│   ├── pipes/                     # Custom pipes
│   └── models/
│       ├── database/              # Core domain models (Entity, Worker, etc.)
│       ├── DTOs/
│       │   ├── Incoming/          # DTOs from backend API
│       │   └── Outgoing/          # DTOs sent to backend API
│       ├── VM/                    # View Models (formatted for UI)
│       ├── UI/                    # UI-specific models
│       └── interfaces/            # TypeScript interfaces
```

### Data Flow Architecture

**API Communication Pattern:**
1. Components inject API services from `core/services/api/`
2. Services use DTOs from `shared/models/DTOs/Outgoing/` for requests
3. Services receive DTOs from `shared/models/DTOs/Incoming/` from backend
4. Components transform DTOs to View Models (VM) for display
5. API paths defined in `shared/constants/APIPathsConstants.ts`

**State Management:**
- JWT tokens stored in LocalStorage via `LocalService`
- No global state management library (Redux/NgRx)
- Component-level state with RxJS observables
- Services communicate via async/await pattern

### Routing Architecture

**Two-tier routing system:**
1. **Public routes** (no authentication): Home, Login, Legal pages
2. **Dashboard routes** (authenticated): All entity management features under `/dashboard`
   - Dashboard acts as a container component with nested child routes
   - All entity-specific routes include `:entityId` parameter
   - Help documentation has its own nested routing under `/dashboard/help`

**Route guards:** No explicit guards implemented; authentication handled in components

### API Integration

**Backend API:**
- Base URL: `http://localhost:5265/api/` (configurable in `APIPathsConstants.ts`)
- All API services inherit async/await pattern
- Error handling via try/catch in each service method
- No centralized HTTP interceptor for auth headers

**Key API Services:**
- `WorkerService`: Authentication (login, register) and user management
- `EntityService`: CRUD for organizations/departments
- `ScheduleService`: Schedule creation, assignment, and validation
- `ShiftService`: Shift templates and rotations
- `RuleService`: Business rules and constraints
- `AbsenceService`: Worker absence tracking and approvals

### UI Framework

**Material Design + Bootstrap:**
- Angular Material 17.2.1 for dialogs, forms, tables, date pickers
- Bootstrap 5.3.3 for layout and responsive grid
- Custom Material theme: `src/custom-theme.scss`
- Date format: `en-GB` locale (DD/MM/YYYY)

**Common UI Patterns:**
- Material Dialog for forms and confirmations
- Snackbar notifications for success/failure (`SuccessSnackbarComponent`, `FailSnackbarComponent`)
- Generic dialogs: `GenericWarningDialogComponent`, `GenericMessageDialogComponent`
- Loading state managed by `LoadingSpinnerManagerService`

### Calendar & Scheduling

**angular-calendar library** (v0.31.1) used for schedule visualization
- Date adapters: date-fns and luxon both included
- Calendar configured in `app.module.ts` with `adapterFactory`
- Schedule event views custom-built in `entity-schedule` module

### Important Development Patterns

**DTO Separation:**
- Always use Outgoing DTOs when sending data to API
- Always expect Incoming DTOs from API responses
- Never send View Models to the API
- Transform between DTOs and VMs in components, not services

**Localization:**
- Use `i18n` attribute for translatable text in templates
- Extract translations before building for specific locale
- Language switching handled by `LanguageServiceService`

**Date Handling:**
- Custom date adapter: `APP_DATE_FORMATS` in `shared/pipes/AppDateAdapter`
- Use `DateDisplayService` for consistent date formatting
- Material date pickers configured for en-GB locale

**Rule Validation:**
- `RuleValidatorService` validates schedules against business rules
- Validation happens client-side before saving
- Rules include: working hours, rest periods, skill requirements, shift coverage

**Export Features:**
- Schedule export to Excel via `exceljs` and `xlsx` libraries
- Schedule export to images via `html-to-image`
- File downloads via `file-saver`

### Testing Considerations

- Unit tests use Jasmine + Karma
- Test files colocated with source: `*.spec.ts`
- UI test playground: `/ui` route (`UITestsComponent`)

### Backend Dependency

The application requires a .NET backend API running on `http://localhost:5265/api/`
- Controllers: Entity, Shift, EntityRule, EntitySchedule, EntityWorkerAbsence, Auth, User
- Authentication: JWT-based (tokens stored in LocalStorage)

### Known Architectural Patterns

**Multi-tenancy:**
- Users can own/belong to multiple "Entities" (organizations)
- Entity ID passed as route parameter for all entity-specific features
- Dashboard home shows all entities for current user

**Component Communication:**
- Parent-child via @Input/@Output
- Service-based for cross-component communication
- No event bus or global state

**Form Handling:**
- Reactive Forms (`ReactiveFormsModule`) for complex forms
- Template-driven forms (`FormsModule`) for simple inputs
- Material form fields with validation
