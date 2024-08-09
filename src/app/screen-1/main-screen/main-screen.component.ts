import { HttpClient } from '@angular/common/http';
import { Component, Inject, inject } from '@angular/core';

import {
  MatDialogModule, MatDialog
} from '@angular/material/dialog';
import { BuyselldialogComponent } from '../buyselldialog/buyselldialog.component';


@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrl: './main-screen.component.css',

})

export class MainScreenComponent {
  stockList : Array<String> = [];
  bondList: Array<String> = [];
  readonly dialog = inject(MatDialog);

  constructor(private http: HttpClient) {  
    //fetch list of stock ids

    this.stockList = ['AAPL', 'HDFC', 'CITI', "ICICI", "MSFT", "X", "CRED", "VISA"  ]

    this.bondList = ['A', 'B', 'C', 'D', 'E', 'F', 'G' ]

    }  

    openDialog(ticker) {
      this.dialog.open(BuyselldialogComponent, {
        data: {
          // animal: 'panda',
  //         buyDate;
  // sellDate: Date;
  marketPrice : 3928392382,
  marketVolume : 782738233,
  volumeHeldByUser: 3849348394,
  moneyInvestedByUser: 797293723,
  ticker_symbol: ticker

        },
      });
    }

}


