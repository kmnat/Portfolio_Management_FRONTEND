import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { StockComponent } from '../stock/stock.component';
import { BondComponent } from '../bond/bond.component';


@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrl: './main-screen.component.css',

})
export class MainScreenComponent {
  stockList : Array<String> = [];
  bondList: Array<String> = [];
  
  constructor(private http: HttpClient) {  
    //fetch list of stock ids

    this.stockList = ['AAPL', 'HDFC', 'CITI', "ICICI", "MSFT", "X", "CRED", "VISA"  ]

this.bondList = ['A', 'B', 'C', 'D', 'E', 'F', 'G' ]

    }  
}
