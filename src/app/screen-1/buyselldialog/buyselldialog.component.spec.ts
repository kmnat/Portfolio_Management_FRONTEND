import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyselldialogComponent } from './buyselldialog.component';

describe('BuyselldialogComponent', () => {
  let component: BuyselldialogComponent;
  let fixture: ComponentFixture<BuyselldialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuyselldialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyselldialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
