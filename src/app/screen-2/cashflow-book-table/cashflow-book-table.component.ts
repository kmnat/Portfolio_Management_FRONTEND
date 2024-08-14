import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Chart,  registerables } from 'chart.js/auto';
import { NgChartjsModule } from 'ng-chartjs';
import 'chartjs-adapter-moment';

export class CashFlowBookEntry {
  ticker_symbol: string;
  date: string;
  asset_name: string;
  realized_pnl: number;
}

@Component({
  selector: 'app-cashflow-book-table',
  templateUrl: './cashflow-book-table.component.html',
  styleUrl: './cashflow-book-table.component.css'
})


export class CashflowBookTableComponent {
  cashFlowEntries: CashFlowBookEntry[] = [];
  displayedColumns: string[] = [

    'ticker_symbol',
    'date',
    'asset_name',
    'realized_pnl',
  
  ];
  toggleCharts : boolean = false;
chartData : {
  labels: string[], // Array of dates
  datasets: {
    label: string, // Asset name
    data: number[], // Array of realized PnL values
    backgroundColor: string // Color for the dataset
  }[]
};
chart : any;
@ViewChild('chart')
canvas: ElementRef<HTMLCanvasElement>;

constructor(private http: HttpClient){

}
pieChart1: any;
@ViewChild("pieChart1")
canvas1: ElementRef<HTMLCanvasElement>;
pieChart1Data = {
  "Stocks" : 0,
  "Bonds" : 0
}


pieChartStocks: any;
pieChartStocksData : { [key: string]: number } = { };
pieChartStocksChart: any;
@ViewChild("pieChartStocks")
canvasStock: ElementRef<HTMLCanvasElement>;


pieChartBonds: any;
pieChartBondsData: { [key: string]: number } = { };
pieChartBondsChart: any;
@ViewChild("pieChartBonds")
canvasBond: ElementRef<HTMLCanvasElement>;

ngOnInit(){
  this.fetchCashflowBook();
  console.log(this.cashFlowEntries);
 
} 

handleSwitch(){
  this.toggleCharts = !this.toggleCharts;
  if(!this.toggleCharts){
   
    this.canvas.nativeElement.style.display="none";
  } 
  else{
this.canvas.nativeElement.style.display="";

this.createChart();


  } 
}


fetchCashflowBook(){
this.http.get<any>(environment.apiUrl + '/assets/cashflow').subscribe(data=>{
  this.cashFlowEntries = data
  console.log(data);
  this.getChartData();



});

 } 
 getChartData() {
  const dateMap = new Map<string, { [asset: string]: number }>();

  // Aggregate realized PnL by date and asset
  this.cashFlowEntries.forEach(entry => {
    const { date, asset_name, realized_pnl } = entry;
    if (!dateMap.has(date)) {
      dateMap.set(date, {});
    }
    const assetData = dateMap.get(date);
    if (!assetData[asset_name]) {
      assetData[asset_name] = 0;
    }
    assetData[asset_name] += realized_pnl;
  });

  // Prepare chart data
  const dates = Array.from(dateMap.keys());
  const assets = new Set<string>();
  const datasets = [];

  // Collect all unique assets
  dateMap.forEach(assetData => {
    Object.keys(assetData).forEach(asset => assets.add(asset));
  });

  // Prepare datasets for Chart.js
  assets.forEach(asset => {
    const data = dates.map(date => dateMap.get(date)[asset] || 0);
    datasets.push({
      label: asset,
      data,
      backgroundColor: this.getRandomColor(), // Use a function to generate colors
    });
  });

  this.chartData = {
    labels: dates,
    datasets,
  };
}


getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


createChart() {
  const ctx = this.canvas.nativeElement.getContext('2d');

  this.chart = new Chart(ctx, {
    type: 'bar',
    data: this.chartData,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              const label = context.dataset.label || '';
              const value = context.raw;
              return `${label}: ${value}`;
            }
          }
        },
      },
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
        }
      }
    }
  });
}






}