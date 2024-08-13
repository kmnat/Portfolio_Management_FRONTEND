import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withFetch } from '@angular/common/http';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import 'chartjs-adapter-moment';

import {
  MatDialogModule,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MainScreen2Component } from './main-screen2/main-screen2.component';
import {MatTableModule} from '@angular/material/table';
import { OrderBookTableComponent } from './order-book-table/order-book-table.component';
import { TradeBookTableComponent } from './trade-book-table/trade-book-table.component';
import { CashflowBookTableComponent } from './cashflow-book-table/cashflow-book-table.component';
import { NgChartjsModule } from 'ng-chartjs';
@NgModule({
  declarations: [

  MainScreen2Component,
    OrderBookTableComponent,
    TradeBookTableComponent,
    CashflowBookTableComponent
  ],
  imports: [
    CommonModule, MatTabsModule, MatCardModule,MatGridListModule, MatDatepickerModule, MatInputModule, MatFormFieldModule, MatDialogModule,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent, NgChartjsModule,
  MatDialogTitle, FormsModule, MatButtonModule,ReactiveFormsModule, MatTableModule
  ],
  exports: [
 MatTabsModule, MatCardModule,MatGridListModule,MatDialogActions,
    MatDialogClose, 
    MatDialogContent, ReactiveFormsModule,
    MatDialogTitle, FormsModule, MatButtonModule, MatDialogModule, MatTableModule
  ],
})
export class Screen2Module { }
