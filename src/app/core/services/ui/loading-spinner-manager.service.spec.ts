import { TestBed } from '@angular/core/testing';

import { LoadingSpinnerManagerService } from './loading-spinner-manager.service';

describe('LoadingSpinnerManagerService', () => {
  let service: LoadingSpinnerManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingSpinnerManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
