import { TestBed } from '@angular/core/testing';

import { ScheduleAuxService } from './schedule-aux.service';

describe('ScheduleAuxService', () => {
  let service: ScheduleAuxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScheduleAuxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
