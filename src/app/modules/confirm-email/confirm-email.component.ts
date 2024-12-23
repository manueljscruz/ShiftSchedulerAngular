import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseResponseModel } from '../../shared/models/baseResponseModel';
import { HomeService } from '../../core/services/api/HomeService';
import { WorkerService } from '../../core/services/api/WorkerService';

@Component({
  selector: 'confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrl: './confirm-email.component.css'
})
export class ConfirmEmailComponent {

  currentWorkerId: string = '';

  constructor(
    private route: ActivatedRoute,
    private workerService: WorkerService,
    private router: Router 
  ) {
    this.currentWorkerId = this.route.snapshot.paramMap.get('workerId') || '';
  }

  async ngOnInit() {
    // Call the API to confirm the email
    let response : BaseResponseModel = await this.workerService.confirmEmail(this.currentWorkerId);

    // If successful, redirect to the login page
    this.router.navigate(['/login']);
  }

  

}
