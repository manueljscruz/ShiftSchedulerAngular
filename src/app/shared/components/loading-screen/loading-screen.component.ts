import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { LoadingSpinnerManagerService } from '../../../core/services/loading-spinner-manager.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrl: './loading-screen.component.css'
})

export class LoadingScreenComponent implements OnInit, OnDestroy {

  isLoading: boolean = false;
  subscription: Subscription = new Subscription();

  constructor(private loadingScreenService : LoadingSpinnerManagerService) { }

  ngOnInit() {
    this.subscription = this.loadingScreenService.currentIsLoading.subscribe(isLoading => this.isLoading = isLoading);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  /*
  ngOnChanges(): void {
    console.log('Loading Screen State : ' + this.isLoading);
  }
  */
}
