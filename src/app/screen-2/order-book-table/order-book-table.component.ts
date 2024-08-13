import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../../../environments/environment.development';


export class OrderBookStockEntry{
    order_id: number;
    ticker_symbol: string;
    trade_date: string;
    asset_name: string;
    volume: number;
    transaction_date: string;
    bought_price: number;
}

export class OrderBookBondEntry {
  order_id: number;
  ticker_symbol: string;
  trade_date: string;
  asset_name: string;
  transaction_date: string;
  bond_price: number;
  maturity_date: string;
}
@Component({
  selector: 'app-order-book-table',
  templateUrl: './order-book-table.component.html',
  styleUrl: './order-book-table.component.css'
})
export class OrderBookTableComponent {
  bondEntries: OrderBookBondEntry[] = [];
  displayedColumns: string[] = [
    'order_id',
    'ticker_symbol',
    'trade_date',
    'asset_name',
    'transaction_date',
    'bond_price',
    'maturity_date'
  ];
  stockEntries: OrderBookStockEntry[] = [];
  displayedColumns2: string[] = [
    'order_id',
    'ticker_symbol',
    'trade_date',
    'asset_name',
    'volume',
    'transaction_date',
    'bought_price'
  ];
  fetchOrderBookStocks(){
    this.http.get<any>(environment.apiUrl+'/orderbookstock/').subscribe(data=>{
      this.stockEntries = data
    })
  }

  fetchOrderBookBonds(){
this.http.get<any>(environment.apiUrl+'/orderbookbond/').subscribe(data=>{
  this.bondEntries = data
})
  }

  constructor(private http: HttpClient){
this.fetchOrderBookBonds();
this.fetchOrderBookStocks();
  }

}
