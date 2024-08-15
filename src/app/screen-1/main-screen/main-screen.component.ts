import { HttpClient } from '@angular/common/http';
import { Component, Inject, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef
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
    this.http.get<any>(this.apiServiceUrl + '/assets/stocks').subscribe(config  => {
  
      for(let i = 0; i < config.length; i++){
        this.stockList[i] = config[i];
      }
      console.log(config);
    });
  }
 

  fetchBondList(){
    this.http.get<any>(this.apiServiceUrl + '/assets/bonds').subscribe(config  => {
  
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

    
    
    openDialog(ticker, isStock: boolean) {
      const dialogRef = this.dialog.open(BuyselldialogComponent, {
        data: { ...ticker, type: isStock ? 'stock' : 'bond' }
      });
    
      dialogRef.afterClosed().subscribe(result => {
        // Handle the result here if needed
        console.log('The dialog was closed');
      });
    }
    

}


