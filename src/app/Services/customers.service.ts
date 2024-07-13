import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  reduce(arg0: (acc: any, customer: any) => any, arg1: { [key: string]: number; }): any {
    throw new Error('Method not implemented.');
  }

  constructor(private _HttpClient:HttpClient) { }

  private BaseURL='http://localhost:3000';

customersData():Observable<any>{
  return this._HttpClient.get(`${this.BaseURL}/customers`)
}

customersTransactions():Observable<any>{
  return this._HttpClient.get(`${this.BaseURL}/transactions`)
}

totalCustomersTransactions(custId:number):Observable<any>{
  return this._HttpClient.get(`${this.BaseURL}/transactions/?customer_id=${custId}`)
}

}
