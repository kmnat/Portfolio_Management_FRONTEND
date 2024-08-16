import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import Chart, { ChartData, ChartOptions, ChartType } from 'chart.js/auto';

@Component({
  selector: 'app-bond',
  templateUrl: './bond.component.html',
  styleUrl: './bond.component.css'
})
export class BondComponent {
  chart : any;
  @ViewChild('bondchart')
  canvas: any;
  // @Id
    @Input() ticker_symbol: String;

    @Input()bond_price : Number;

    @Input()coupon_rate : Number;

    @Input()credit_rating : Number;

    @Input()face_value : Number;

    @Input()issuer : string;

    @Input()maturity_date : String;
    
    historical_data: { dates: string[], prices: number[] } = { dates: [], prices: [] };
  public lineChartData: ChartData<'line'>;
  public lineChartOptions: ChartOptions<'line'>;
  public lineChartType: ChartType = 'line';
  public lineChartLegend = true;
  public lineChartPlugins = [];
  bondPrice: any;

constructor(private http: HttpClient){

}
ngOnInit(){
 

  this.http.get<any>(environment.apiUrl + '/assets/timeseries/bond/' + this.ticker_symbol).subscribe(data=>{
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
              console.log('bond tool', tooltipItem);
               return `${tooltipItem.label}: ${tooltipItem.raw}`;
             }
           }
         }
       }
     }
   });
 
    
 }



}
