import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BuyselldialogComponent } from '../../screen-1/buyselldialog/buyselldialog.component';

@Component({
  selector: 'app-selldialog',
  templateUrl: './selldialog.component.html',
  styleUrl: './selldialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelldialogComponent {

  sellDate = new FormControl(); 
unrealizedPnL : number = 0;
  sellTransactionPrice = 0;
  quantity = new FormControl(0);

ngOnInit(): void {
  this.fetchUnrealizedPnl()
}
fetchUnrealizedPnl(){
this.http.get<any>(environment.apiUrl + '/assets/unrealised_pnl/' + this.data.tickerSymbol).subscribe((data=>{
  this.unrealizedPnL = data;
  console.log(data);
}))
}
 
  sellStock(){
this.http.post<any>(environment.apiUrl + "/assets/sellStock?quantity=" + this.quantity.value + "&tickerSymbol=" + this.data.tickerSymbol , { }).subscribe(response =>{
  console.log(response);
})
this.onNoClick();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  

  constructor(    public dialogRef: MatDialogRef<BuyselldialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient) {

  }

  
}
