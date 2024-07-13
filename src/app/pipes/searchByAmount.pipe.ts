import { Pipe, PipeTransform } from '@angular/core';
import { CustomerTrans } from '../interfaces/CustomerTrans';

@Pipe({
  name: 'searchByAmount'
})
export class searchByAmountPipe implements PipeTransform {

  transform(transactions: CustomerTrans[], amount: number): CustomerTrans[] {
    if (!transactions || !amount) {
      return transactions;
    }
    
    return transactions.filter(transaction => transaction.amount == amount);
  }
}
