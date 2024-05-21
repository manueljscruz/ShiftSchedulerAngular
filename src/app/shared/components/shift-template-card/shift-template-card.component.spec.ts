import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftTemplateCardComponent } from './shift-template-card.component';

describe('ShiftTemplateCardComponent', () => {
  let component: ShiftTemplateCardComponent;
  let fixture: ComponentFixture<ShiftTemplateCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShiftTemplateCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShiftTemplateCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
