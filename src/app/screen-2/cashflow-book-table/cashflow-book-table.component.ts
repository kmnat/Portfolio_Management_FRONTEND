import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Chart,  registerables } from 'chart.js/auto';
import { NgChartjsModule } from 'ng-chartjs';
import 'chartjs-adapter-moment';

export class CashFlowBookEntry {
  id: number;
  ticker_symbol: string;
  date: string;
  asset_name: string;
  realized_pnl: number;
  unrealized_pnl: number;
}

@Component({
  selector: 'app-cashflow-book-table',
  templateUrl: './cashflow-book-table.component.html',
  styleUrl: './cashflow-book-table.component.css'
})


export class CashflowBookTableComponent {
  cashFlowEntries: CashFlowBookEntry[] = [];
  displayedColumns: string[] = [
    'id',
    'ticker_symbol',
    'date',
    'asset_name',
    'realized_pnl',
    'unrealized_pnl'
  ];
chartData = {
  'Realized PnL' :  [],
  'Unrealized PnL' : [],
  'Date': []
}
chartDataAsset = {
  'Realized PnL' : [],
  'Unrealized PnL' : [],
  'Asset Name' : []
};

chart : any;
@ViewChild('chart')
canvas: ElementRef<HTMLCanvasElement>;

chartAsset : any;
@ViewChild('chartAsset')
canvasAsset : ElementRef<HTMLCanvasElement>;
constructor(private http: HttpClient){}

ngOnInit(){
  this.fetchCashflowBook();
  console.log(this.cashFlowEntries);
 
} 

fetchCashflowBook(){
this.http.get<any>(environment.apiUrl2 + 'cashflowbook/').subscribe(data=>{
  this.cashFlowEntries = data
  console.log(data)
this.getChartData();
this.getChartDataAsset();
  console.log(this.chartData);
  Chart.register(...registerables);
  this.createChart();
this.createChartAsset();
});

 } 
getChartData(){
  this.cashFlowEntries.forEach(entry => {
    this.chartData['Realized PnL'].push(entry.realized_pnl);
    this.chartData['Unrealized PnL'].push(entry.unrealized_pnl);
    this.chartData['Date'].push(entry.date);
  });

  console.log(this.chartData);
}

getChartDataAsset(){
  this.cashFlowEntries.forEach(entry => {
    this.chartDataAsset['Realized PnL'].push(entry.realized_pnl);
    this.chartDataAsset['Unrealized PnL'].push(entry.unrealized_pnl);
    this.chartDataAsset['Asset Name'].push(entry.asset_name);
  });

}


createChart(){

 this.chart =  new Chart( this.canvas.nativeElement.getContext('2d'), {
    type: 'line', // Specify the type of chart here
    data: {
      labels: this.chartData['Date'],
    
      datasets: [
        {
          label: 'Realized PnL',
          data: this.chartData['Realized PnL'],
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: false
        },
        {
          label: 'Unrealized PnL',
          data: this.chartData['Unrealized PnL'],
          borderColor: 'rgba(153, 102, 255, 1)',
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          fill: false
        }
      ]
    },
    options: {
      scales: {
        x: {
          type: 'time',
          time: {
            unit: 'day'
          }
        },
        y: {
          beginAtZero: true
        }
      }
    }
  });
}


createChartAsset(){

  this.chartAsset =  new Chart( this.canvasAsset.nativeElement.getContext('2d'), {
     type: 'bar', // Specify the type of chart here
     data: {
       labels: this.chartDataAsset['Asset Name'],
     
       datasets: [
         {
           label: 'Realized PnL',
           data: this.chartData['Realized PnL'],
           borderColor: 'rgba(75, 192, 192, 1)',
           backgroundColor: 'rgba(75, 192, 192, 0.2)',
           stack: 'stack1'
         },
         {
           label: 'Unrealized PnL',
           data: this.chartData['Unrealized PnL'],
           borderColor: 'rgba(153, 102, 255, 1)',
           backgroundColor: 'rgba(153, 102, 255, 0.2)',
           stack: 'stack2'
         }
       ]
     },
     options: {
      scales: {
        x: {
          stacked: true // Enable stacking on x-axis
        },
        y: {
          stacked: true, // Enable stacking on y-axis
          beginAtZero: true
        }
      }
     }
   });
 }


}