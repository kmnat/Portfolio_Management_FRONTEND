import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
  @Output() close = new EventEmitter<void>();


 buyStock(){
    this.http.post<any>(environment.apiUrl + "/assets/buyStock?quantity=" + this.quantity.value + "&tickerSymbol=" + this.data.tickerSymbol , { }).subscribe(response =>{
       console.log(response);
    })
    this.onNoClick();
 }
 buyBond(){
  this.http.post<any>(environment.apiUrl + "/assets/buyBond?quantity=" + this.quantity.value + "&tickerSymbol=" + this.data.tickerSymbol , { }).subscribe(response =>{
    console.log(response);
 })
 this.onNoClick();
 }
  sellStock(){

  }

  sellBond(){

  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  constructor( public dialogRef: MatDialogRef<BuyselldialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient) {

  }

  
}
