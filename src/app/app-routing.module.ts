import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainScreenComponent } from './screen-1/main-screen/main-screen.component';
import { MainScreen2Component } from './screen-2/main-screen2/main-screen2.component';

const routes: Routes = [
  {
    path: '', component: MainScreenComponent,
   
  },
  {
    path: 'transactions', component: MainScreen2Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
