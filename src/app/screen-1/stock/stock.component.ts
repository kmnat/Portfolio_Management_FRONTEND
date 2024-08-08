import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.css',

})
export class StockComponent {

market_volume : Number = 0;
market_price : Number = 0;
company_name: String = '';
industry: String = '';  
week52high: Number = 0;
week52low: Number = 0;
@Input() ticker_symbol: String = '';

constructor(private http: HttpClient) {  
//api response

  this.market_volume = 98329382382;
  this.market_price = 983493849384; //market_exchnage
  this.company_name = 'Apple Inc.';
  this.industry = 'Technology';
  this.week52high = 8273823732;
  this.week52low = 327632373;

 }

}
