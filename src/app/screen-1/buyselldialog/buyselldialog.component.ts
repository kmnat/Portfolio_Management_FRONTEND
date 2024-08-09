import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-buyselldialog',
  templateUrl: './buyselldialog.component.html',
  styleUrl: './buyselldialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})


export class BuyselldialogComponent {
  buyDate = new FormControl();
  sellDate = new FormControl(); 
  buyTransactionPrice = 0;
  sellTransactionPrice = 0;
  quantity = new FormControl(0);
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {

  }

  
}
