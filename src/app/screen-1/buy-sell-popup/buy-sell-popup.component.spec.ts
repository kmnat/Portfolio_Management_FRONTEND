import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuySellPopupComponent } from './buy-sell-popup.component';

describe('BuySellPopupComponent', () => {
  let component: BuySellPopupComponent;
  let fixture: ComponentFixture<BuySellPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuySellPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuySellPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
