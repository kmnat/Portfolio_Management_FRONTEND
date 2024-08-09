import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainScreenComponent } from './main-screen/main-screen.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { StockComponent } from './stock/stock.component';
import { BondComponent } from './bond/bond.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import { BuySellPopupComponent } from './buy-sell-popup/buy-sell-popup.component';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';


@NgModule({
  declarations: [
    MainScreenComponent,
    StockComponent,
    BondComponent,
    BuySellPopupComponent,
    
  ],
  imports: [
    CommonModule, MatTabsModule,MatCardModule,MatGridListModule, MatDatepickerModule, MatInputModule, MatFormFieldModule,  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle, FormsModule, MatButtonModule
  ],
  exports: [
    MainScreenComponent, MatTabsModule, StockComponent, BondComponent, MatCardModule,MatGridListModule,MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle, FormsModule, MatButtonModule
  ],
  providers: [
    provideHttpClient( withFetch(),), provideNativeDateAdapter()
  ]
})
export class Screen1Module {

 }
