import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { HomeComponent } from './modules/home/home.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { DashboardHomeComponent } from './modules/dashboard-home/dashboard-home.component';
import { NewEntityComponent } from './modules/new-entity/new-entity.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { EntityWorkersComponent } from './modules/entity-workers/entity-workers.component';
import { EntityScheduleComponent } from './modules/entity-schedule/entity-schedule.component';
import { UITestsComponent } from './modules/uitests/uitests.component';
import { EntityFormComponent } from './modules/entity-form/entity-form.component';
import { EntityShiftsComponent } from './modules/entity-shifts/entity-shifts.component';
import { EntityRulesComponent } from './modules/entity-rules/entity-rules.component';
import { EntityAbsencesComponent } from './modules/entity-absences/entity-absences.component';
import { ConfirmEmailComponent } from './modules/confirm-email/confirm-email.component';
import { HelpdocsComponent } from './modules/helpdocs/helpdocs.component';
import { HelpIntroComponent } from './modules/helpdocs/pages/help-intro/help-intro.component';
import { HelpFaqComponent } from './modules/helpdocs/pages/help-faq/help-faq.component';
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
import { TermsConditionsComponent } from './modules/terms-conditions/terms-conditions.component';
import { CookiesPolicyComponent } from './modules/cookies-policy/cookies-policy.component';
import { ContactsComponent } from './modules/contacts/contacts.component';
import { PrivacyPolicyComponent } from './modules/privacy-policy/privacy-policy.component';
import { SearchResultsComponent } from './modules/search-results/search-results.component';
import { SettingsComponent } from './modules/settings/settings.component';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'ui', component: UITestsComponent},
  { path: 'login', component: LoginComponent },
  { path: 'confirm-email/:workerId', component: ConfirmEmailComponent },
  { path: 'terms-conditions', component: TermsConditionsComponent},
  { path: 'cookies-policy', component: CookiesPolicyComponent},
  { path: 'contacts', component: ContactsComponent},
  { path: 'privacy-policy', component: PrivacyPolicyComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard], children: [
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'home', component: DashboardHomeComponent},
    { path: 'profile', component: ProfileComponent},
    { path: 'search-results', component: SearchResultsComponent},
    { path: 'new-entity', component: NewEntityComponent},
    { path: 'settings', component: SettingsComponent},
    { path: 'entity-form/:entityId', component: EntityFormComponent},
    { path: 'entity-workers/:entityId', component: EntityWorkersComponent},
    { path: 'entity-schedule/:entityId', component: EntityScheduleComponent},
    { path: 'entity-shifts/:entityId', component: EntityShiftsComponent},
    { path: 'entity-rules/:entityId', component: EntityRulesComponent},
    { path: 'entity-absences/:entityId', component: EntityAbsencesComponent},
    { path: 'help', component: HelpdocsComponent, children: [
      { path: '', redirectTo: 'intro', pathMatch: 'full' },
      { path: 'intro', component: HelpIntroComponent },
      { path: 'get-started', component: HelpGetStartedComponent },
      { path: 'features', component: HelpFeaturesComponent },
      { path: 'tutorials', component: HelpTutorialsComponent },
      { path: 'faq', component: HelpFaqComponent},
      { path: 'members', component: HelpMembersComponent},
      { path: 'schedules', component: HelpSchedulesComponent},
      { path: 'shifts', component: HelpShiftsComponent},
      { path: 'rules', component: HelpRulesComponent},
      { path: 'absences', component: HelpAbsencesComponent},
      { path: 'profile-management', component: HelpProfileManagementComponent},
      { path: 'privacy', component: HelpPrivacyComponent},
      { path: 'notifications', component: HelpNotificationsComponent},
      { path: 'billing', component: HelpBillingComponent},
      { path: 'contact-support', component: HelpContactSupportComponent},
      { path: 'release-notes', component: HelpReleaseNotesComponent},
      { path: 'legal', component: HelpLegalComponent},
    ]}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
