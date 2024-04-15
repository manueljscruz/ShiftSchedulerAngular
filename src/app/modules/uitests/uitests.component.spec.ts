import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UITestsComponent } from './uitests.component';

describe('UITestsComponent', () => {
  let component: UITestsComponent;
  let fixture: ComponentFixture<UITestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UITestsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UITestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
