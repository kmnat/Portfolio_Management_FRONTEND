import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-selldialog',
  templateUrl: './selldialog.component.html',
  styleUrl: './selldialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelldialogComponent {

  sellDate = new FormControl(); 

  sellTransactionPrice = 0;
  quantity = new FormControl(0);


 
  sellStock(){
this.http.post<any>(environment.apiUrl + "/assets/sellStock?quantity=" + this.quantity.value + "&tickerSymbol=" + this.data.tickerSymbol , { }).subscribe(response =>{
  console.log(response);
})
  }

  

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient) {

  }

  
}
