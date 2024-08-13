import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import {
  MatDialog
} from '@angular/material/dialog';
import { BuyselldialogComponent } from '../buyselldialog/buyselldialog.component';
import { StockComponent } from '../stock/stock.component';
import { BondComponent } from '../bond/bond.component';



@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrl: './main-screen.component.css',

})

export class MainScreenComponent {
  stockList : Array<any> = [];
  bondList: Array<any> = [];
  readonly dialog = inject(MatDialog);
  apiServiceUrl = environment.apiUrl
  fetchStockList(){
    this.http.get<any>(this.apiServiceUrl + 'stocks/').subscribe(config  => {
  
      for(let i = 0; i < config.length; i++){
        this.stockList[i] = config[i];
      }
    });
  }


  fetchBondList(){
    this.http.get<any>(this.apiServiceUrl + 'bonds/').subscribe(config  => {
  
      for(let i = 0; i < config.length; i++){
        this.bondList[i] = config[i];
      }
    });

  }


  constructor(private http: HttpClient) {  
    //fetch list of stock ids

    this.fetchStockList();
    this.fetchBondList();

    }  


    fetchStockOrderBookData(){

    }

    fetchBondOrderBookData(){
    }


    openDialog(ticker, isStock:boolean) {
      let data = {
        ...ticker,
        type: isStock? 'stock' : 'bond'
      }
      //fetch data from api based on ticker_id parameter

      this.dialog.open(BuyselldialogComponent, 
        {
        data: data,
      });
    }

}


