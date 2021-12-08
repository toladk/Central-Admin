import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproverolesComponent } from './approveroles.component';

describe('ApproverolesComponent', () => {
  let component: ApproverolesComponent;
  let fixture: ComponentFixture<ApproverolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproverolesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproverolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
