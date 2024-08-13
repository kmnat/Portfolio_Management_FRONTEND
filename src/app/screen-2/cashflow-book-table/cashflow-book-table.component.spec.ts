import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashflowBookTableComponent } from './cashflow-book-table.component';

describe('CashflowBookTableComponent', () => {
  let component: CashflowBookTableComponent;
  let fixture: ComponentFixture<CashflowBookTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CashflowBookTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashflowBookTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
