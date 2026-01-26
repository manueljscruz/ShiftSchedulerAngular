import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
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
import { MatIconModule } from '@angular/material/icon';
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
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatRippleModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HeaderLessTabsDirective } from './shared/directives/header-less-tabs.directive';
import { ShiftTemplateCardComponent } from './shared/components/shift-template-card/shift-template-card.component';
import {MatTableModule} from '@angular/material/table';
import { GenericWarningDialogComponent } from './shared/components/generic-warning-dialog/generic-warning-dialog.component';
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
import { MatSliderModule } from '@angular/material/slider';
import { ScheduleEventViewComponent } from './modules/entity-schedule/schedule-event-view/schedule-event-view.component';
import { ScheduleCreatorMenuComponent } from './modules/entity-schedule/schedule-creator-menu/schedule-creator-menu.component';
import { NgxColorsModule } from 'ngx-colors';
import { ScheduleActionMenuComponent } from './modules/entity-schedule/schedule-action-menu/schedule-action-menu.component';
import { MatMenuModule } from '@angular/material/menu';
import { ScheduleEventViewHolderComponent } from './modules/entity-schedule/schedule-event-view-holder/schedule-event-view-holder.component';
import { WorkerSkillSelectorComponent } from './modules/entity-schedule/worker-skill-selector/worker-skill-selector.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import {provideNativeDateAdapter} from '@angular/material/core';
import { MatDateFormats } from '@angular/material/core';
import { APP_DATE_FORMATS } from './shared/pipes/AppDateAdapter';
import { WorkerFiltersDialogComponent } from './modules/entity-workers/worker-filters-dialog/worker-filters-dialog.component';
import { HelpdocsComponent } from './modules/helpdocs/helpdocs.component';
import { HelpIntroComponent } from './modules/helpdocs/pages/help-intro/help-intro.component';
import { HelpFaqComponent } from './modules/helpdocs/pages/help-faq/help-faq.component';
// GetStartedComponent removed because file was missing; use HelpGetStartedComponent instead
import { HelpGetStartedComponent } from './modules/helpdocs/pages/help-get-started/help-get-started.component';
import { HelpFeaturesComponent } from './modules/helpdocs/pages/help-features/help-features.component';
import { HelpTutorialsComponent } from './modules/helpdocs/pages/help-tutorials/help-tutorials.component';
import { HelpMembersComponent } from './modules/helpdocs/pages/help-members/help-members.component';
import { HelpSchedulesComponent } from './modules/helpdocs/pages/help-schedules/help-schedules.component';
import { HelpShiftsComponent } from './modules/helpdocs/pages/help-shifts/help-shifts.component';
import { HelpRulesComponent } from './modules/helpdocs/pages/help-rules/help-rules.component';
import { HelpAbsencesComponent } from './modules/helpdocs/pages/help-absences/help-absences.component';
import { HelpProfileManagementComponent } from './modules/helpdocs/pages/help-profile-management/help-profile-management.component';
import { HelpPrivacyComponent } from './modules/helpdocs/pages/help-privacy/help-privacy.component';
import { HelpNotificationsComponent } from './modules/helpdocs/pages/help-notifications/help-notifications.component';
import { HelpBillingComponent } from './modules/helpdocs/pages/help-billing/help-billing.component';
import { HelpContactSupportComponent } from './modules/helpdocs/pages/help-contact-support/help-contact-support.component';
import { HelpReleaseNotesComponent } from './modules/helpdocs/pages/help-release-notes/help-release-notes.component';
import { HelpLegalComponent } from './modules/helpdocs/pages/help-legal/help-legal.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { TermsConditionsComponent } from './modules/terms-conditions/terms-conditions.component';
import { PrivacyPolicyComponent } from './modules/privacy-policy/privacy-policy.component';
import { CookiesPolicyComponent } from './modules/cookies-policy/cookies-policy.component';
import { ContactsComponent } from './modules/contacts/contacts.component';
import { DashboardTabViewComponent } from './modules/dashboard-home/dashboard-tab-view/dashboard-tab-view.component';
import { A11yModule } from "@angular/cdk/a11y";
import { SearchResultsComponent } from './modules/search-results/search-results.component';
import { SearchResultItemComponent } from './modules/search-results/search-result-item/search-result-item.component';
import { SettingsComponent } from './modules/settings/settings.component';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { AuthErrorInterceptor } from './core/interceptors/auth-error.interceptor';
import { ForgotPasswordDialogComponent } from './modules/home/forgot-password-dialog/forgot-password-dialog.component';
import { ResetPasswordComponent } from './modules/reset-password/reset-password.component';
import { EmailNotConfirmedDialogComponent } from './modules/home/email-not-confirmed-dialog/email-not-confirmed-dialog.component';
import { PublicProfileComponent } from './modules/public-profile/public-profile.component';

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
    GenericWarningDialogComponent,
    EntityRulesComponent,
    EntityAbsencesComponent,
    EntityAbsencesViewComponent,
    EntityAbsencesFormComponent,
    EditMemberDialogComponent,
    GenericMessageDialogComponent,
    ConfirmEmailComponent,
    ShiftRotationDialogFormComponent,
    ScheduleEventViewComponent,
    ScheduleCreatorMenuComponent,
    ScheduleActionMenuComponent,
    ScheduleEventViewHolderComponent,
    WorkerSkillSelectorComponent,
    WorkerFiltersDialogComponent,
    HelpdocsComponent,
    HelpIntroComponent,
    HelpFaqComponent,
    HelpGetStartedComponent,
    HelpFeaturesComponent,
    HelpTutorialsComponent,
    HelpMembersComponent,
    HelpSchedulesComponent,
    HelpShiftsComponent,
    HelpRulesComponent,
    HelpAbsencesComponent,
    HelpProfileManagementComponent,
    HelpPrivacyComponent,
    HelpNotificationsComponent,
    HelpBillingComponent,
    HelpContactSupportComponent,
    HelpReleaseNotesComponent,
    HelpLegalComponent,
    FooterComponent,
    TermsConditionsComponent,
    PrivacyPolicyComponent,
    CookiesPolicyComponent,
    ContactsComponent,
    DashboardTabViewComponent,
    SearchResultsComponent,
    SearchResultItemComponent,
    SettingsComponent,
    ForgotPasswordDialogComponent,
    ResetPasswordComponent,
    EmailNotConfirmedDialogComponent,
    PublicProfileComponent
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
    MatIconModule,
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
    MatSliderModule,
    NgxColorsModule,
    MatMenuModule,
    MatSidenavModule,
    MatTooltipModule,
    CalendarModule.forRoot({
        provide: DateAdapter,
        useFactory: adapterFactory,
    }),
    MatPaginatorModule,
    A11yModule
],
  providers: [
    provideNativeDateAdapter(),
    provideClientHydration(),
    provideAnimationsAsync(),
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideHttpClient(withInterceptors([AuthErrorInterceptor]))
  ],
  bootstrap: [AppComponent]
})

export class AppModule { 
}
