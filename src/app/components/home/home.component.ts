import { Component } from '@angular/core';
import { CustomersService } from 'src/app/Services/customers.service';
import { CustomerTrans } from 'src/app/interfaces/CustomerTrans';
import { Customer } from 'src/app/interfaces/customer';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  
})
export class HomeComponent {
  constructor(private Customer: CustomersService) { }
  
  ngOnInit(): void {
    this.CustomerData() ;
    this.CustomerTrans();
  }
  
  Customers:Customer[]=[];
  Transactions:CustomerTrans[]=[];
  AmountSearch:number|null=null;

 
  CustomerData(){
    this.Customer.customersData().subscribe({
      next: (res: any) => {
        this.Customers=res
        console.log(res)
      },
      error: (err: any) => {
        console.log(err);

      }
    })
  }

  CustomerTrans(){
    this.Customer.customersTransactions().subscribe({
      next: (res: any) => {
        this.Transactions = res;
        console.log(res)
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  getCustomerName(customerId: number): string {
    const customer = this.Customers.find(c => c.id == customerId);
    return customer ? customer.name : 'Unknown';
  }




}
