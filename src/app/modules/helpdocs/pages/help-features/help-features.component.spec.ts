import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpFeaturesComponent } from './help-features.component';

describe('HelpFeaturesComponent', () => {
  let component: HelpFeaturesComponent;
  let fixture: ComponentFixture<HelpFeaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HelpFeaturesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HelpFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
