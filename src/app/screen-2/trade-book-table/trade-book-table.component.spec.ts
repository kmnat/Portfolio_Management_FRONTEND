import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeBookTableComponent } from './trade-book-table.component';

describe('TradeBookTableComponent', () => {
  let component: TradeBookTableComponent;
  let fixture: ComponentFixture<TradeBookTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TradeBookTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TradeBookTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
