import { TestBed } from '@angular/core/testing';

import { SidebarNavigationService } from './sidebar-navigation.service';

describe('SidebarNavigationService', () => {
  let service: SidebarNavigationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SidebarNavigationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
