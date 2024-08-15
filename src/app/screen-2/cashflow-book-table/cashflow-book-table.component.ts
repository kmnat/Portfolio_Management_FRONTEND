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


chartLine : any;
@ViewChild('chartLine')
canvasLine: ElementRef<HTMLCanvasElement>;

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
    const { date, ticker_symbol, realized_pnl } = entry;
    if (!dateMap.has(date)) {
      dateMap.set(date, {});
    }
    const assetData = dateMap.get(date);
    if (!assetData[ticker_symbol]) {
      assetData[ticker_symbol] = 0;
    }
    assetData[ticker_symbol] += realized_pnl;
  });

  // Prepare chart data
  const dates = Array.from(dateMap.keys());
  const ticker_symbols = new Set<string>();
  const datasets = [];

  // Collect all unique assets
  dateMap.forEach(ticker_symbolData => {
    Object.keys(ticker_symbolData).forEach(ticker_symbol => ticker_symbols.add(ticker_symbol));
  });

  // Prepare datasets for Chart.js
  ticker_symbols.forEach(ticker_symbol => {
    const data = dates.map(date => dateMap.get(date)[ticker_symbol] || 0);
    datasets.push({
      label: ticker_symbol,
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
  const ctxBar = this.canvas.nativeElement.getContext('2d');
  const ctxLine = this.canvasLine.nativeElement.getContext('2d'); // Assuming you have a separate canvas for the trendline

  // Ensure `this.chartData` is properly structured for the stacked bar chart
  const dates = this.chartData.labels as string[];

  // Calculate net values for each date
  const netValues = dates.map(date => {
    const dataPoints = this.chartData.datasets.map(dataset =>
      dataset.data[dates.indexOf(date)] || 0
    );
    return dataPoints.reduce((acc, value) => acc + value, 0);
  });

  // Create the stacked bar chart
  new Chart(ctxBar, {
    type: 'bar',
    data: {
      labels: dates,
      datasets: this.chartData.datasets
    },
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
          ticks: {
            callback: (value) => `${value}`
          }
        }
      }
    }
  });

  // Create the trendline chart
  new Chart(ctxLine, {
    type: 'line',
    data: {
      labels: dates,
      datasets: [
        {
          type: 'line',
          label: 'Trendline',
          data: netValues,
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 2,
          fill: false,
          tension: 0.1, // Smooth line
        }
      ]
    },
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
          type: 'category',
          labels: dates,
        },
        y: {
          ticks: {
            callback: (value) => `${value}`
          }
        }
      }
    }
  });
}







}