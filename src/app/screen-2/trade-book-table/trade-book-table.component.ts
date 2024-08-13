import { HttpClient } from "@angular/common/http";
import { Component, ElementRef, ViewChild } from "@angular/core";
import { environment } from "../../../environments/environment.development";
import Chart from "chart.js/auto";

export class TradeEntry {
  id: Number;
  ticker_symbol: String;
  asset_name: string;
  category: String; //STOCK or BOND
  date: String;
  action: String; //BUY SELL
  volume: Number;
  amount: Number;
}

@Component({
  selector: "app-trade-book-table",
  templateUrl: "./trade-book-table.component.html",
  styleUrl: "./trade-book-table.component.css",
})
export class TradeBookTableComponent {
  apiUrl = environment.apiUrl2;
  tradebook: Array<TradeEntry> = [];
  displayedColumns = [
    "id",
    "asset_name",
    "ticker_symbol",
    "category",
    "date",
    "action",
    "volume",
    "amount",
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

  ngOnInit() {
    this.fetchTradeBook();
  }
  fetchTradeBook() {
    this.http.get<any>(this.apiUrl + "tradebook/").subscribe((data) => {
      this.tradebook = data;
      this.getPieChart1Data();
      this.createPieChart1();
      this.getPieChartBondsData();
      this.getPieChartStocksData();
this.createPieChartBonds();
this.createPieChartStocks();
    });
  }

  getPieChart1Data() {
    this.tradebook.forEach((entry) => {
      if (entry.category === "Stock") {
        this.pieChart1Data["Stocks"] += Number(entry.amount);
      } else if (entry.category === "Bond") {
        this.pieChart1Data["Bonds"] += Number(entry.amount);
      }
    });
  }

  createPieChart1() {
    this.pieChart1 = new Chart(this.canvas1.nativeElement.getContext("2d"), {
      type: "pie", // Set chart type to 'pie',
      data: {
        labels: Object.keys(this.pieChart1Data), // Pie chart slices labels
        datasets: [
          {
            data: Object.values(this.pieChart1Data), // Data for each slice
            backgroundColor: [
              "rgba(75, 192, 192, 0.5)",
              "rgba(153, 102, 255, 0.5)",
            ],
            borderColor: ["rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)"],
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
    this.tradebook.forEach((entry) => {
      if (entry.category === "Bond") {
        if (!this.pieChartBondsData[entry.asset_name]) {
          this.pieChartBondsData[entry.asset_name] = 0;
        }
        this.pieChartBondsData[entry.asset_name] += Number(entry.amount);
      }
    });
  }

  getPieChartStocksData() {
    this.tradebook.forEach((entry) => {
      if (entry.category === "Stock") {
        if (!this.pieChartStocksData[entry.asset_name]) {
          this.pieChartStocksData[entry.asset_name] = 0;
        }
        this.pieChartStocksData[entry.asset_name] += Number(entry.amount);
      }
    });
  }

  createPieChartBonds() {
    if (this.canvasBond && this.canvasBond.nativeElement) {
      this.pieChartBonds = new Chart(this.canvasBond.nativeElement.getContext("2d"), {
        type: "pie",
        data: {
          labels: Object.keys(this.pieChartBondsData),
          datasets: [
            {
              data: Object.values(this.pieChartBondsData),
              backgroundColor: ["rgba(75, 192, 192, 0.5)", "rgba(153, 102, 255, 0.5)", "rgba(255, 159, 64, 0.5)"], // Add more colors if needed
              borderColor: ["rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)", "rgba(255, 159, 64, 1)"], // Match with the background color
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
    }}
    createPieChartStocks() {
      if (this.canvasStock && this.canvasStock.nativeElement) {
        this.pieChartStocks = new Chart(this.canvasStock.nativeElement.getContext("2d"), {
          type: "pie",
          data: {
            labels: Object.keys(this.pieChartStocksData),
            datasets: [
              {
                data: Object.values(this.pieChartStocksData),
                backgroundColor: ["rgba(255, 99, 132, 0.5)", "rgba(54, 162, 235, 0.5)", "rgba(255, 206, 86, 0.5)"], // Add more colors if needed
                borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)"], // Match with the background color
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
  constructor(private http: HttpClient) {}
}

// / create data
// var data = [
//   {x: "A", value: 637166},
//   {x: "B", value: 721630},
//   {x: "C", value: 148662},
//   {x: "D", value: 78662},
//   {x: "E", value: 90000}
// ];

// // create a chart and set the data
// chart = anychart.pie(data);

// // set the container id
// chart.container("container");

// // initiate drawing the chart
// chart.draw();
