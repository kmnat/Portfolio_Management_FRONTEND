import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainScreenComponent } from './main-screen/main-screen.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { StockComponent } from './stock/stock.component';
import { BondComponent } from './bond/bond.component';
import { provideHttpClient, withFetch } from '@angular/common/http';


@NgModule({
  declarations: [
    MainScreenComponent,
    StockComponent,
    BondComponent,
    
  ],
  imports: [
    CommonModule, MatTabsModule,MatCardModule,MatGridListModule,
  ],
  exports: [
    MainScreenComponent, MatTabsModule, StockComponent, BondComponent, MatCardModule,MatGridListModule
  ],
  providers: [
    provideHttpClient( withFetch(),)
  ]
})
export class Screen1Module {

 }
