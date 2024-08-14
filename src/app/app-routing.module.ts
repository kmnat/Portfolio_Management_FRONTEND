import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainScreenComponent } from './screen-1/main-screen/main-screen.component';
import { MainScreen2Component } from './screen-2/main-screen2/main-screen2.component';
import { TradeBookTableComponent } from './screen-2/trade-book-table/trade-book-table.component';
import { OrderBookTableComponent } from './screen-2/order-book-table/order-book-table.component';
import { CashflowBookTableComponent } from './screen-2/cashflow-book-table/cashflow-book-table.component';

const routes: Routes = [
  {
    path: '', component: MainScreenComponent,
   
  },
  {
    path: 'transactions', component: MainScreen2Component
  },
  {path: 'tradebook', component: TradeBookTableComponent},
  {path: 'orderbook', component: OrderBookTableComponent},
  {path: 'cashflowbook', component: CashflowBookTableComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
