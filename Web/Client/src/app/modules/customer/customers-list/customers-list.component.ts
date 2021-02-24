import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getCustomers } from 'src/app/store/actions/customer.actions';
import { CustomerState } from 'src/app/store/reducers/customer.reducer';
import { getCustomersSelector } from 'src/app/store/selectors/customer.selectors';
import { Order } from '../../order/resources/models/order.model';
import { Customer } from '../resources/models/customer.model';
import { removeCustomer as remove  }from 'src/app/store/actions/customer.actions';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss']
})
export class CustomersListComponent implements OnInit {

  customers$ = this.store.select(getCustomersSelector)

  constructor(private store: Store<CustomerState>) {
   }

  ngOnInit(): void {
    this.store.dispatch(getCustomers())
  }

  removeCustomer(customer: Customer){
    this.store.dispatch(remove({id: customer.id}))
  }

  getTotalOrderedCost(orders: Order[]){
    if(orders.length != 0){
      return orders.map(x => x.totalCost).reduce((p,c) => p + c)
    }
    return 0
  }

}
