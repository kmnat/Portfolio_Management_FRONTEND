import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import Chart, { ChartData, ChartOptions, ChartType } from 'chart.js/auto';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.css',

})
export class StockComponent {
  chart : any;
  @ViewChild('chart')
  canvas: ElementRef<HTMLCanvasElement>;
  
  @Input() average_volume : Number;
  @Input() market_price : Number;
  @Input() company_name: String;
  @Input() industry: String;  
  @Input() week52high: Number;
  @Input() week52low: Number;
@Input() ticker_symbol: String ;
@Input() market_exchange : String;
historical_data: { dates: string[], prices: number[] } = { dates: [], prices: [] };
  public lineChartData: ChartData<'line'>;
  public lineChartOptions: ChartOptions<'line'>;
  public lineChartType: ChartType = 'line';
  public lineChartLegend = true;
  public lineChartPlugins = [];

constructor(private http: HttpClient){

}


ngOnInit(){
 

 this.http.get<any>(environment.apiUrl + '/assets/timeseries/stock/' + this.ticker_symbol).subscribe(data=>{
  console.log(data)
  this.historical_data = data;
  this.createChart();
 }) 
}
createChart(): void {
  this.chart = new Chart(this.canvas.nativeElement.getContext('2d'), {
    type: 'line' as ChartType, // Specify the type of chart here
    data: {
      labels: this.historical_data.dates,
      datasets: [
        {
          label: 'Average Price',
          data: this.historical_data.prices,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: false
        }
      ]
    },
    options: {
      responsive: false, // Disable responsive resizing
      scales: {
        x: {
          type: 'time',
          time: {
            unit: 'day'
          },
          ticks: {
            display: false // Hide x-axis labels
          },
          title: {
            display: true,
            text: 'Date'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Average Price'
          },
          beginAtZero: true
        }
      },
      plugins: {
        legend: {
          display: true,
          position: 'top'
        },
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              return `${tooltipItem.label}: ${tooltipItem.raw}`;
            }
          }
        }
      }
    }
  });

   
}


}
