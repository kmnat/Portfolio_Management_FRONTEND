import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { StockComponent } from '../../screen-1/stock/stock.component';
import { BondComponent } from '../../screen-1/bond/bond.component';
import Chart from 'chart.js/auto';
import { SelldialogComponent } from '../selldialog/selldialog.component';
import { MatDialog } from '@angular/material/dialog';


export class OrderBookStockEntry{
  
 order_id: number;
 stock: {
  tickerSymbol: string;
  tradeDate: string;
  averageVolume: number;
  companyName: string;
  industry: string;
  marketExchange: number;
  stockPrice: number;
  week52High: number;
  week52Low: number;
  currentPrice: number;
};
asset_name: string;
volume: number;
bought_price: number;
  
}

export class OrderBookBondEntry {
  order_id: number;
  bond: {
    tickerSymbol : string;
     tradeDate: string,
      bondPrice : number,
     couponRate : number,
      creditRating: number,
      faceValue: number,
      maturityDate: string,
      maturityAmount: number,
      issuer: string
  };
}
@Component({
  selector: 'app-order-book-table',
  templateUrl: './order-book-table.component.html',
  styleUrl: './order-book-table.component.css'
})
export class OrderBookTableComponent {
  toggleCharts: boolean = false;

  bondEntries: OrderBookBondEntry[] = [];
  displayedColumns: string[] = [
    'order_id',
    'ticker_symbol',
    'trade_date',
    'asset_name',

    'bond_price',
    'maturity_date'
  ];
  stockEntries: OrderBookStockEntry[] = [];
  displayedColumns2: string[] = [
    'order_id',
    'ticker_symbol',
    'trade_date',
    'asset_name',
    'volume',

    'bought_price',
    'unrealized_pnl',
  ];
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
  readonly dialog = inject(MatDialog);
  getUnrealizedPnl(entry: OrderBookStockEntry): number {
    return entry.stock.currentPrice - entry.bought_price;
  }
  handleSwitch(){
    this.toggleCharts = !this.toggleCharts;
    if(!this.toggleCharts){
      this.canvas1.nativeElement.style.display = 'none';
      this.canvasBond.nativeElement.style.display="none";
      this.canvasStock.nativeElement.style.display="none";
    } 
    else{
  this.canvas1.nativeElement.style.display = '';
  this.canvasBond.nativeElement.style.display = '';
  this.canvasStock.nativeElement.style.display = '';
  this.createPieChart1();
  this.createPieChartBonds();
  this.createPieChartStocks();
  
    } 
  }

  getPieChart1Data() {
 
    this.http.get<any>(environment.apiUrl + '/assets/bond_price_sum').subscribe(data => {
      this.pieChart1Data["Bonds"] = data
    });
    this.http.get<any>(environment.apiUrl + '/assets/stock_price_sum').subscribe(data => {
      this.pieChart1Data["Stocks"] = data
    });

  }
  createPieChart1() {
    if(this.pieChart1) this.pieChart1.destroy();
    this.pieChart1 = new Chart(this.canvas1.nativeElement.getContext("2d"), {
      type: "pie", // Set chart type to 'pie'
      data: {
        labels: Object.keys(this.pieChart1Data), // Pie chart slices labels
        datasets: [
          {
            data: Object.values(this.pieChart1Data), // Data for each slice
            backgroundColor: [
              "rgba(75, 192, 192, 0.5)",
              "rgba(153, 102, 255, 0.5)",
            ],
            borderColor: [
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)"
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true, // Display the title
            text: 'Distribution of Investments across Financial Instruments', // Title text
            padding: {
              top: 10,
              bottom: 20
            },
            font: {
              size: 18, // Font size for the title
              weight: 'bold' // Font weight for the title
            }
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                return `${tooltipItem.label}: ${tooltipItem.raw}$`;
              },
            },
          },
        },
      },
    });
  }
  

  getPieChartBondsData() {
    this.bondEntries.forEach((entry) => {
   
        if (!this.pieChartBondsData[entry.bond.tickerSymbol]) {
          this.pieChartBondsData[entry.bond.tickerSymbol] = 0;
        
        this.pieChartBondsData[entry.bond.tickerSymbol] += Number(entry.bond.bondPrice);
      }
    });
    console.log(this.pieChartBondsData)
  }

  getPieChartStocksData() {
    this.stockEntries.forEach((entry) => {
    
        if (!this.pieChartStocksData[entry.stock.tickerSymbol]) {
          this.pieChartStocksData[entry.stock.tickerSymbol] = 0;
        }
        this.pieChartStocksData[entry.stock.tickerSymbol] += Number(entry.bought_price);
      
    });
  }
 
  createPieChartBonds() {
if(this.pieChartBonds) this.pieChartBonds.destroy();
    if (this.canvasBond && this.canvasBond.nativeElement) {
      this.pieChartBonds = new Chart(this.canvasBond.nativeElement.getContext("2d"), {
        type: "pie",
        data: {
          labels: Object.keys(this.pieChartBondsData),
          datasets: [
            {
              data: Object.values(this.pieChartBondsData),
              backgroundColor: Object.keys(this.pieChartBondsData).map(() => this.getRandomColor()), // Use random colors
              borderColor: Object.keys(this.pieChartBondsData).map(() => this.getRandomColor()), // Use random colors
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true, // Display the title
              text: 'Investment Distribution Across Bonds', // Title text
              padding: {
                top: 10,
                bottom: 20
              },
              font: {
                size: 18, // Font size for the title
                weight: 'bold' // Font weight for the title
              }
            },
            tooltip: {
              callbacks: {
                label: function (tooltipItem) {
                  return `${tooltipItem.label}: ${tooltipItem.raw}$`;
                },
              },
            },
          },
        },
      });
    }
  }
  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
  createPieChartStocks() {
    if(this.pieChartStocks) this.pieChartStocks.destroy();
    if (this.canvasStock && this.canvasStock.nativeElement) {
      this.pieChartStocks = new Chart(this.canvasStock.nativeElement.getContext("2d"), {
        type: "pie",
        data: {
          labels: Object.keys(this.pieChartStocksData),
          datasets: [
            {
              data: Object.values(this.pieChartStocksData),
              backgroundColor: Object.keys(this.pieChartStocksData).map(() => this.getRandomColor()), // Use random colors
              borderColor: Object.keys(this.pieChartStocksData).map(() => this.getRandomColor()), // Use random colors
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true, // Display the title
              text: 'Investment Distribution Across Stocks', // Title text
              padding: {
                top: 10,
                bottom: 20
              },
              font: {
                size: 18, // Font size for the title
                weight: 'bold' // Font weight for the title
              }
            },
            tooltip: {
              callbacks: {
                label: function (tooltipItem) {
                  return `${tooltipItem.label}: ${tooltipItem.raw}$`;
                },
              },
            },
          },
        },
      });
    }
  }
  
  fetchOrderBookStocks(){
    this.http.get<any>(environment.apiUrl+'/assets/order_stocks').subscribe(data=>{
      this.stockEntries = data
      this.getPieChartStocksData();
      this.getPieChart1Data();
     
    })
  
    
  }

  fetchOrderBookBonds(){
this.http.get<any>(environment.apiUrl+'/assets/order_bonds').subscribe(data=>{
  this.bondEntries = data

  this.getPieChartBondsData();

})
  }

  ngAfterViewInit(){
    this.fetchOrderBookBonds();
    this.fetchOrderBookStocks();
  }

  

  openDialog(ticker, isStock:boolean) {
    let data = {
      tickerSymbol: ticker,
      type: isStock? 'stock' : 'bond'
    }
    //fetch data from api based on ticker_id parameter

    this.dialog.open(SelldialogComponent, 
      {
      data: data,
    });
  }
  constructor(private http: HttpClient){

  }

}
