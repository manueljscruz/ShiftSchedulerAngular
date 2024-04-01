import { Component, Inject } from '@angular/core';
import { LocalService } from '../../core/services/local.service';
import { Router } from '@angular/router';
import { WorkerDTO } from '../../shared/models/DTOs/WorkerDTO';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent {

  loggedUser: WorkerDTO;

  constructor(@Inject(LocalService) private localStore: LocalService, private router: Router) {
    this.loggedUser = JSON.parse(this.localStore.getData("loggedUser"));
  }

  logout() {
    this.localStore.removeData("loggedUser");
    this.router.navigate(['/login']);
  }

}
