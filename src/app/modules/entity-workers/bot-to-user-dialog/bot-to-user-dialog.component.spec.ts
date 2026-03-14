import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotToUserDialogComponent } from './bot-to-user-dialog.component';

describe('BotToUserDialogComponent', () => {
  let component: BotToUserDialogComponent;
  let fixture: ComponentFixture<BotToUserDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BotToUserDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BotToUserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
