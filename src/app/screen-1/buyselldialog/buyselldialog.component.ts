import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from '../../../environments/environment.development';

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


 buyStock(){
    this.http.post<any>(environment.apiUrl + "/assets/buyStock?quantity=" + this.quantity.value + "&tickerSymbol=" + this.data.tickerSymbol , { }).subscribe(response =>{
       console.log(response);
    })
 }
 buyBond(){
  this.http.post<any>(environment.apiUrl + "/assets/buyBond?quantity=" + this.quantity.value + "&tickerSymbol=" + this.data.tickerSymbol , { }).subscribe(response =>{
    console.log(response);
 })
 }
  sellStock(){

  }

  sellBond(){

  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient) {

  }

  
}
