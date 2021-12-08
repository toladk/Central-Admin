import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovetellerComponent } from './approveteller.component';

describe('ApprovetellerComponent', () => {
  let component: ApprovetellerComponent;
  let fixture: ComponentFixture<ApprovetellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovetellerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovetellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
