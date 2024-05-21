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

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'ui', component: UITestsComponent},
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, children: [
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'home', component: DashboardHomeComponent},
    { path: 'profile', component: ProfileComponent},
    { path: 'new-entity', component: NewEntityComponent},
    { path: 'entity-form/:entityId', component: EntityFormComponent},
    { path: 'entity-workers/:entityId', component: EntityWorkersComponent},
    { path: 'entity-schedule/:entityId', component: EntityScheduleComponent},
    { path: 'entity-shifts/:entityId', component: EntityShiftsComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
