import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveroleComponent } from './approverole.component';

describe('ApproveroleComponent', () => {
  let component: ApproveroleComponent;
  let fixture: ComponentFixture<ApproveroleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveroleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveroleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
