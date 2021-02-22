import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Guid } from 'guid-typescript';
import { Subscription } from 'rxjs';
import { getCustomers } from 'src/app/store/actions/customer.actions';
import { getOrder, updateOrder } from 'src/app/store/actions/order.actions';
import { CustomerState } from 'src/app/store/reducers/customer.reducer';
import { getCustomersSelector } from 'src/app/store/selectors/customer.selectors';
import { getOrderSelector } from 'src/app/store/selectors/order.selectors';
import { Customer } from '../../customer/resources/models/customer.model';
import { Order } from '../resources/models/order.model';
import { Status } from '../resources/models/status.enum';

@Component({
  selector: 'app-update-order',
  templateUrl: './update-order.component.html',
  styleUrls: ['./update-order.component.scss']
})
export class UpdateOrderComponent implements OnInit, OnDestroy {

  orderId: string
  order: Order
  order$ : Subscription

  constructor(private activatedRoute: ActivatedRoute,
              private store: Store<CustomerState>,
              private router: Router) {
    activatedRoute.params.subscribe(params => this.orderId = params['id']).unsubscribe()
    if(this.orderId){
      this.store.dispatch(getOrder({id: this.orderId}))
      this.order$ = this.store.select(getOrderSelector).subscribe(data => this.order = data)
      if(!this.order){
        this.router.navigate(['/order/detail', this.orderId])
      }
    }

  }

  ngOnDestroy(): void {
    if(this.order){
      this.order$.unsubscribe()
    }
  }

  ngOnInit(): void {

  }

  updateOrder(updatedOrder: Order){
    this.order = {...this.order,
                  customerId: updatedOrder.customerId,
                  status: updatedOrder.status,
                  comment: updatedOrder.comment
                }
    this.store.dispatch(updateOrder({orderToUpdate: this.order}))
  }
}
