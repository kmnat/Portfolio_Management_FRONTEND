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
  stockList : Array<StockComponent> = [];
  bondList: Array<BondComponent> = [];
  
  constructor(private http: HttpClient) {  
    //fetch stocklist and bond list using http
    this.stockList = []


    }  
}
