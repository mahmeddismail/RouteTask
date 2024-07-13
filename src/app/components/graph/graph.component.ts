import { Component,SimpleChanges,ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexLegend
} from "ng-apexcharts";
import { CustomerTrans } from 'src/app/interfaces/CustomerTrans';
import { CustomersService } from 'src/app/Services/customers.service';




export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  labels: string[];
  legend: ApexLegend;
  subtitle: ApexTitleSubtitle;
};

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent {

  CustomerId:any;


  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

constructor(private Customer: CustomersService,private _ActivatedRoute:ActivatedRoute) {
    this.chartOptions = {
      series: [
        {
          name: "Desktops",
          data: this.Data
        }
      ],
      chart: {
        height: 350,
        type: "line"
      },
      title: {
        text: "Product Trends by Month",
        align: "left"
      },
      xaxis: {
        categories: this.Categories
      },
      dataLabels: {
        enabled: false
      }
    
    }

}
ngOnInit(): void {
  this.getCustomerId();
 
}


getCustomerId() {
  setTimeout(() => {
    this._ActivatedRoute.paramMap.subscribe((params) => {
      this.CustomerId = params.get('id');
      if (this.CustomerId) {
        this.CustomerTrans(this.CustomerId);
      } 
    });
  }, 200);   
}

Transactions:CustomerTrans[]=[];

Categories:any[]=[];
Data:any[]=[];



CustomerTrans(customer_id:number){
  this.Customer.totalCustomersTransactions(customer_id).subscribe({
    next: (res: any) => {
      this.Transactions = res;
      this.Categories= this.Transactions.map(transaction => transaction.date);
       this.Data = this.Transactions.map(transaction => transaction.amount);
       console.log(this.Data)
       this.chartOptions = {
        ...this.chartOptions,
        xaxis: {
          ...this.chartOptions.xaxis,
          categories: this.Categories
        },
        series: [
          {
            name: "Amount",
            data: this.Data
          }
        ]
      } 
    },
    error: (err: any) => {
      console.log(err);
    }
  })
}




}
