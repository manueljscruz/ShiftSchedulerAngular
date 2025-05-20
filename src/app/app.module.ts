import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HomeNavbarComponent } from './modules/home/home-navbar/home-navbar.component';
import { RegisterDialogComponent } from './modules/home/register-dialog/register-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from './modules/login/login.component';
import { HomeComponent } from './modules/home/home.component';
import { MatCardModule } from '@angular/material/card';
import { MatTab, MatTabsModule} from '@angular/material/tabs';
import { MatError } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatIcon } from '@angular/material/icon';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { AppSidebarComponent } from './shared/components/app-sidebar/app-sidebar.component';
import { AppHeaderComponent } from './shared/components/app-header/app-header.component';
import { SidebarItemComponent } from './shared/components/sidebar-item/sidebar-item.component';
import { SidebarItemGroupComponent } from './shared/components/sidebar-item-group/sidebar-item-group.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { DashboardHomeComponent } from './modules/dashboard-home/dashboard-home.component';
import { NewEntityComponent } from './modules/new-entity/new-entity.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { LoadingScreenComponent } from './shared/components/loading-screen/loading-screen.component';
import { EntityWorkersComponent } from './modules/entity-workers/entity-workers.component';
import { EntityScheduleComponent } from './modules/entity-schedule/entity-schedule.component';
import { SuccessSnackbarComponent } from './shared/components/success-snackbar/success-snackbar.component';
import { FailSnackbarComponent } from './shared/components/fail-snackbar/fail-snackbar.component';
import { EntityWorkerMemberCardComponent } from './shared/components/entity-worker-member-card/entity-worker-member-card.component';
import { MatChipsModule, MatChipGrid } from '@angular/material/chips';
import { UITestsComponent } from './modules/uitests/uitests.component';
import {MatDividerModule} from '@angular/material/divider';
import { EntityFormComponent } from './modules/entity-form/entity-form.component';
import { DeleteEntityWarningDialogComponent } from './modules/entity-form/delete-entity-warning-dialog/delete-entity-warning-dialog.component';
import { AddMemberDialogComponent } from './modules/entity-workers/add-member-dialog/add-member-dialog.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { EntityShiftsComponent } from './modules/entity-shifts/entity-shifts.component';
import { ShiftBreakDialogFormComponent } from './modules/entity-shifts/shift-break-dialog-form/shift-break-dialog-form.component';
import { MatRippleModule } from '@angular/material/core';
import { HeaderLessTabsDirective } from './shared/directives/header-less-tabs.directive';
import { ShiftTemplateCardComponent } from './shared/components/shift-template-card/shift-template-card.component';
import {MatTableModule} from '@angular/material/table';
import { GenericDeleteWarningDialogComponent } from './shared/components/generic-delete-warning-dialog/generic-delete-warning-dialog.component';
import { EntityRulesComponent } from './modules/entity-rules/entity-rules.component';
import { EntityAbsencesComponent } from './modules/entity-absences/entity-absences.component';
import { EntityAbsencesViewComponent } from './modules/entity-absences/entity-absences-view/entity-absences-view.component';
import { EntityAbsencesFormComponent } from './modules/entity-absences/entity-absences-form/entity-absences-form.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { EditMemberDialogComponent } from './modules/entity-workers/edit-member-dialog/edit-member-dialog.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { GenericMessageDialogComponent } from './shared/components/generic-message-dialog/generic-message-dialog.component';
import { ConfirmEmailComponent } from './modules/confirm-email/confirm-email.component';
import { ShiftRotationDialogFormComponent } from './modules/entity-shifts/shift-rotation-dialog-form/shift-rotation-dialog-form.component';
import { MatSlider } from '@angular/material/slider';
import { ScheduleEventViewComponent } from './modules/entity-schedule/schedule-event-view/schedule-event-view.component';
import { ScheduleCreatorMenuComponent } from './modules/entity-schedule/schedule-creator-menu/schedule-creator-menu.component';
import { NgxColorsModule } from 'ngx-colors';


@NgModule({
  declarations: [
    AppComponent,
    HomeNavbarComponent,
    RegisterDialogComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    AppSidebarComponent,
    AppHeaderComponent,
    SidebarItemComponent,
    SidebarItemGroupComponent,
    DashboardHomeComponent,
    NewEntityComponent,
    ProfileComponent,
    LoadingScreenComponent,
    EntityWorkersComponent,
    EntityScheduleComponent,
    SuccessSnackbarComponent,
    FailSnackbarComponent,
    EntityWorkerMemberCardComponent,
    UITestsComponent,
    EntityFormComponent,
    DeleteEntityWarningDialogComponent,
    AddMemberDialogComponent,
    EntityShiftsComponent,
    ShiftBreakDialogFormComponent,
    HeaderLessTabsDirective,
    ShiftTemplateCardComponent,
    GenericDeleteWarningDialogComponent,
    EntityRulesComponent,
    EntityAbsencesComponent,
    EntityAbsencesViewComponent,
    EntityAbsencesFormComponent,
    EditMemberDialogComponent,
    GenericMessageDialogComponent,
    ConfirmEmailComponent,
    ShiftRotationDialogFormComponent,
    ScheduleEventViewComponent,
    ScheduleCreatorMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    HttpClientModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatIcon,
    MatExpansionModule,
    MatChipsModule,
    MatDividerModule,
    MatTabsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatRippleModule,
    MatTableModule,
    MatDatepickerModule,
    BrowserAnimationsModule,
    MatButtonToggleModule,
    MatSlider,
    NgxColorsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
