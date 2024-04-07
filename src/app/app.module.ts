import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HomeNavbarComponent } from './modules/home/home-navbar/home-navbar.component';
import { RegisterDialogComponent } from './modules/home/register-dialog/register-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from './modules/login/login.component';
import { HomeComponent } from './modules/home/home.component';
import { MatCardModule } from '@angular/material/card';
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
    FailSnackbarComponent
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
    MatExpansionModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
