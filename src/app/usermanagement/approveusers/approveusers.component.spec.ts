import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveusersComponent } from './approveusers.component';

describe('ApproveusersComponent', () => {
  let component: ApproveusersComponent;
  let fixture: ComponentFixture<ApproveusersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveusersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
