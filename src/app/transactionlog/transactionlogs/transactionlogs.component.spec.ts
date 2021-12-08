import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionlogsComponent } from './transactionlogs.component';

describe('TransactionlogsComponent', () => {
  let component: TransactionlogsComponent;
  let fixture: ComponentFixture<TransactionlogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionlogsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
