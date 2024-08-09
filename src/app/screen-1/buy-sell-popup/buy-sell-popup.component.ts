import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-buy-sell-popup',
  templateUrl: './buy-sell-popup.component.html',
  styleUrl: './buy-sell-popup.component.css'
})


export class BuySellPopupComponent {
  currentVolumeHeldByUser: Number = 0;
  buyDate: Date = new Date();
  sellDate: Date = new Date();
  buyPrice: Number = 0;
  sellPrice: Number = 0;
  marketVolume: Number = 0;
  
  //create a function to return cumulative volume at a given date

  constructor(private http: HttpClient) {  

    //request to fetch user details (current volume held by user)

  }
}
