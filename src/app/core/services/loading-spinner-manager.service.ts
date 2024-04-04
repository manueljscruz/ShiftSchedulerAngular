import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoadingSpinnerManagerService {

  private isLoadingSource = new BehaviorSubject<boolean>(false);
  currentIsLoading  = this.isLoadingSource.asObservable();

  constructor() { }

  changeLoadingState(newState: boolean){
    console.log('Loading State Changed : ' + newState);
    this.isLoadingSource.next(newState);
  }
}
