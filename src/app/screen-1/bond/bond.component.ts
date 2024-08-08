import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-bond',
  templateUrl: './bond.component.html',
  styleUrl: './bond.component.css'
})
export class BondComponent {

  // @Id
    @Input() ticker_symbol: String;

    bond_price : Number = 0;

    coupon_rate : Number = 0;

    credit_rating : Number = 0;

    face_value : Number = 0;

    issuer : String = '';

    maturity_date : String = '';

    constructor(private http: HttpClient) {  
      //api response
      this.bond_price = 27382378273;
      this.coupon_rate = 27382378273;
      this.credit_rating = 27382378273;
      this.face_value = 27382378273;
      this.issuer = 'HDFC securities';
      this.maturity_date = '14-08-2023'
     
    }


}
