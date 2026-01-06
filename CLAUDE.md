# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Development Server
```bash
ng serve                    # Start dev server at http://localhost:4200/
npm start                   # Alias for ng serve
```

### Build
```bash
ng build                    # Build the project (outputs to dist/)
ng build --watch --configuration development   # Watch mode for development
npm run build               # Alias for ng build
```

### Testing
```bash
ng test                     # Run unit tests via Karma
```

### Server-Side Rendering
```bash
ng build                    # Build first
npm run serve:ssr:ShiftSchedulerAngular   # Run SSR server (node dist/shift-scheduler-angular/server/server.mjs)
```

### Code Generation
```bash
ng generate component component-name   # All components are non-standalone (configured in angular.json)
ng generate directive|pipe|service|class|guard|interface|enum|module
```

## Architecture Overview

### Entity-Centric Domain Model
The application revolves around "Entities" (work organizations/teams). Each entity has:
- **Workers** (team members) - managed in `/entity-workers/:entityId`
- **Shifts** (work period templates) - managed in `/entity-shifts/:entityId`
- **Rules** (business constraints) - managed in `/entity-rules/:entityId`
- **Absences** (leave/time off) - managed in `/entity-absences/:entityId`
- **Schedules** (assigned work schedules) - managed in `/entity-schedule/:entityId`

All entity-related routes use `:entityId` parameter and follow this pattern.

### Project Structure
```
src/app/
├── core/                      # Framework-level services and interceptors
│   ├── services/api/          # API communication (EntityService, WorkerService, ScheduleService, etc.)
│   ├── services/ui/           # UI state management (SnackbarManagerService, LoadingSpinnerManagerService, etc.)
│   ├── services/              # Business logic (DateDisplayService, LanguageService, RuleValidatorService, etc.)
│   ├── interceptors/          # HTTP interceptors (CredentialsInterceptor, AuthErrorInterceptor)
│   └── storage/               # LocalService (localStorage), SessionService (sessionStorage)
├── modules/                   # Feature modules organized by domain
│   ├── home/, login/          # Public/auth pages
│   ├── dashboard/             # Main authenticated container with sidebar
│   ├── new-entity/, entity-form/, entity-workers/, entity-shifts/, entity-rules/, entity-absences/, entity-schedule/
│   └── helpdocs/              # Help documentation with nested routing
├── shared/                    # Reusable components, models, utilities
│   ├── components/            # Reusable UI components (app-header, app-sidebar, dialogs, cards, etc.)
│   ├── models/                # Type definitions organized by purpose
│   │   ├── database/          # Core domain entities (Entity, Gender, etc.)
│   │   ├── DTOs/Incoming/     # Server response DTOs (UserDTO, EntityDTO, ShiftDTO, etc.)
│   │   ├── DTOs/Outgoing/     # Client request DTOs (LoginDTO, CreateEntityScheduleDTO, etc.)
│   │   ├── VM/                # View Models (EntityScheduleViewModel, EntityMembersViewModel, etc.)
│   │   └── UI/                # UI-specific models (SideBarItemModel, SnackbarUIModel, etc.)
│   ├── constants/             # Centralized constants (APIPathsConstants, ViewRoutesConstants, HttpConstants, etc.)
│   ├── directives/            # Custom directives (HeaderLessTabsDirective)
│   └── pipes/                 # Custom pipes (AppDateAdapter)
```

### Non-Standalone Component Architecture
**IMPORTANT**: All components, directives, and pipes are declared in the central [app.module.ts](src/app/app.module.ts), NOT as standalone components. This is explicitly configured in [angular.json](angular.json):
```json
"schematics": {
  "@schematics/angular:component": { "standalone": false },
  "@schematics/angular:directive": { "standalone": false },
  "@schematics/angular:pipe": { "standalone": false }
}
```

When creating new components, they must be added to the `declarations` array in AppModule.

### API Service Pattern
All API communication follows a consistent pattern in [core/services/api/](src/app/core/services/api/):

```typescript
@Injectable({ providedIn: 'root' })
export class EntityService {
  constructor(private http: HttpClient, private languageService: LanguageServiceService) {}

  async getEntityProfileViewModel(requestDTO: EntityProfileViewModelRequestDTO): Promise<any> {
    try {
      const response = await this.http.post(GET_ENTITY_PROFILE_VM, requestDTO).toPromise();
      return response;
    } catch (error: any) {
      console.error('Error fetching data:', error.message);
    }
  }
}
```

**Key conventions**:
- Use async/await with Promise-based HTTP calls (`.toPromise()`)
- Try-catch blocks with `console.error` logging
- Return `BaseResponseModel` for structured responses: `{ success: boolean, message: string, result: any }`
- Always pass `languageCode` from LanguageService for i18n support

### DTO Pattern (Data Transfer Objects)
Clear separation between incoming and outgoing data in [shared/models/DTOs/](src/app/shared/models/DTOs/):

- **Incoming/** - Server responses (EntityWorkerMemberDTO, ScheduleEntryDTO, etc.)
- **Outgoing/** - Client requests (CreateEntityScheduleDTO, AssignEntryDTO, etc.)
- **Common base**: Many DTOs extend `BaseViewModelRequestDTO` which includes `entityId`, `workerId`, `languageCode`

Always use appropriate DTOs rather than plain objects for type safety.

### View Model Pattern
Complex pages use ViewModels that aggregate multiple DTOs from [shared/models/VM/](src/app/shared/models/VM/):

```typescript
EntityScheduleViewModel {
  scheduleEntries: ScheduleEntryDTO[]
  allowEdit: boolean
  entityWorkerMembers: EntityWorkerMemberDTO[]
  shifts: ShiftDTO[]
  entityRules: EntityRuleDTO[]
}
```

This pattern reduces API calls by fetching all required data in one request.

### Constants Organization
**NEVER hardcode URLs or routes**. All constants are centralized in [shared/constants/](src/app/shared/constants/):

- **APIPathsConstants.ts** - All API endpoints organized by controller
  - Base URL: `http://localhost:5265/api/`
  - Pattern: `BASE_API_URL + CONTROLLER_NAME + "/endpoint"`
- **ViewRoutesConstants.ts** - Frontend route definitions
- **HttpConstants.ts** - HTTP status codes and methods
- **IconNamesConstants.ts** - Material icon names
- **UITextConstants.ts** - UI text constants (enables future i18n)

### HTTP Interceptors
Functional interceptors (Angular 17 style) in [core/interceptors/](src/app/core/interceptors/):

- **CredentialsInterceptor** - Adds `withCredentials: true` to ALL requests for cookie-based authentication
- **AuthErrorInterceptor** - Global error handling (currently placeholder for 401 handling)

### Routing Architecture
Two-level hierarchy defined in [app-routing.module.ts](src/app/app-routing.module.ts):

1. **Root routes**: Home, Login, Confirm Email, Legal pages
2. **Dashboard child routes**: All authenticated features nested under `/dashboard`
   - `/dashboard/home` - Dashboard overview
   - `/dashboard/entity-workers/:entityId` - Team members
   - `/dashboard/entity-schedule/:entityId` - Schedule management
   - `/dashboard/help` - Help documentation with nested routes

### Dynamic Sidebar Navigation
The sidebar system (managed by SidebarNavigationService) dynamically builds navigation:

- Uses `BehaviorSubject<SideBarItemModel[]>` for reactive state
- Each entity gets a collapsible group with sub-items (Home, Members, Shifts, Rules, Absences, Schedule)
- Automatically updated when entities are added/updated/deleted
- Components: [app-sidebar](src/app/shared/components/app-sidebar/), [sidebar-item](src/app/shared/components/sidebar-item/), [sidebar-item-group](src/app/shared/components/sidebar-item-group/)

### UI State Management Services
Centralized UI state in [core/services/ui/](src/app/core/services/ui/):

- **LoadingSpinnerManagerService** - Global loading state (use for async operations)
- **SnackbarManagerService** - Success/failure notifications with custom components (SuccessSnackbarComponent, FailSnackbarComponent)
- **SidebarNavigationService** - Dynamic sidebar menu management

### Storage Strategy
Two-tier storage approach:

- **LocalService** - Persistent data in localStorage (loggedUser, tokenData)
- **SessionService** - Session-scoped data in sessionStorage with namespace prefix `app.session.`

### Schedule Management System
The [entity-schedule](src/app/modules/entity-schedule/entity-schedule.component.ts) component (1151 lines) is the most complex feature:

- **Dual view modes**: Calendar view (angular-calendar) and List/Table view
- **Rotation cycles**: Apply shift rotations to workers over date ranges
- **Drag-and-drop**: Assign workers to shifts
- **Excel export**: Export schedule table via ExcelJS
- **Rule validation**: Validate schedules against business rules
- **Pagination**: Large datasets handled with `PagedList<T>`

### Multi-Language Support (i18n)
Full internationalization configured in [angular.json](angular.json):

- **Source locale**: English (`en`)
- **Supported locales**: French (`fr`), Spanish (`es`), German (`de`), Italian (`it`), Portuguese (`pt`)
- **Translation files**: [src/locale/](src/locale/) (messages.*.xlf)
- **Language service**: LanguageService returns current language code for API requests
- **Build configs**: Separate configurations for each locale with language-specific base hrefs

### Material Design Integration
Heavy use of Angular Material throughout:

- Custom theme: [src/custom-theme.scss](src/custom-theme.scss)
- Material dialogs for all modals (MatDialog pattern with data passing)
- Material tables with pagination (MatTableDataSource + MatPaginator)
- Material form fields with validation
- Material snackbars for notifications

### Authentication (JWT - In Progress)
Currently on `jwt-auth` branch implementing JWT authentication:

- **Cookie-based credentials**: `withCredentials: true` on all requests via CredentialsInterceptor
- **AuthService**: Handles login flow in [core/services/auth-service.service.ts](src/app/core/services/auth-service.service.ts)
- **Storage**: TokenData and loggedUser stored in localStorage via LocalService
- **Interceptors**: AuthErrorInterceptor placeholder for 401 handling

## Development Best Practices

### When Creating New Features

1. **API calls**: Create/use services in `core/services/api/` - never make HTTP calls directly from components
2. **Data types**: Always use DTOs from `shared/models/DTOs/` - never use `any` if a DTO exists
3. **Constants**: Use constants from `shared/constants/` - never hardcode URLs, routes, or magic strings
4. **Error handling**: Wrap HTTP calls in try-catch, return BaseResponseModel
5. **Loading states**: Use LoadingSpinnerManagerService for async operations
6. **Notifications**: Use SnackbarManagerService for user feedback (success/error messages)
7. **Dialogs**: Use Material dialogs (MatDialog) with data passing pattern
8. **Language**: Always pass `languageCode` to API requests via LanguageService
9. **Storage**: Use LocalService for persistent data, SessionService for session data
10. **Module registration**: Add new components to AppModule declarations (non-standalone architecture)

### Component Communication Patterns

- **Parent → Child**: `@Input()` properties
- **Child → Parent**: `@Output()` EventEmitters
- **Service state**: BehaviorSubjects in services for reactive state
- **Dialog results**: `dialogRef.afterClosed().subscribe()`

### Key Files to Understand

- [src/app/app.module.ts](src/app/app.module.ts) - Central module configuration (all components declared here)
- [src/app/app-routing.module.ts](src/app/app-routing.module.ts) - Route definitions
- [src/app/shared/constants/APIPathsConstants.ts](src/app/shared/constants/APIPathsConstants.ts) - All API endpoints
- [src/app/shared/models/baseResponseModel.ts](src/app/shared/models/baseResponseModel.ts) - Standard API response format
- [src/app/modules/dashboard/dashboard.component.ts](src/app/modules/dashboard/dashboard.component.ts) - Main authenticated container
- [src/app/modules/entity-schedule/entity-schedule.component.ts](src/app/modules/entity-schedule/entity-schedule.component.ts) - Complex scheduling logic

### Pagination Pattern
Use `PagedList<T>` model for large datasets:

```typescript
PagedList<EntityWorkerMemberDTO> {
  items: EntityWorkerMemberDTO[]
  pageNumber: number
  pageSize: number
  totalCount: number
  totalPages: number
}
```

API services that return paginated data use `PagedModelRequest` DTO for requests.

### Dialog Component Pattern
Common pattern for Material dialogs:

```typescript
const dialogRef = this.dialog.open(ComponentName, {
  data: { /* data to pass */ },
  width: '600px'
});

dialogRef.afterClosed().subscribe(result => {
  if (result) {
    // Handle dialog result
  }
});
```

Common dialogs available in [shared/components/](src/app/shared/components/):
- GenericWarningDialogComponent - Reusable confirmation dialogs
- GenericMessageDialogComponent - Reusable info/message dialogs
