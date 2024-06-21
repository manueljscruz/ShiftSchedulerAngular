import { TestBed } from '@angular/core/testing';

import { RuleValidatorService } from './rule-validator.service';

describe('RuleValidatorService', () => {
  let service: RuleValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RuleValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
