import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { getOrders, removeOrder } from 'src/app/store/actions/order.actions';
import { OrderState } from 'src/app/store/reducers/order.reducer';
import { getOrdersSelector } from 'src/app/store/selectors/order.selectors';
import { Order } from '../resources/models/order.model';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit, OnDestroy {

  orders$: Subscription
  orders: Order[]

  constructor(private store: Store<OrderState>,
              private router: Router) { }
  ngOnDestroy(): void {
    this.orders$.unsubscribe()
  }

  ngOnInit(): void {
    this.store.dispatch(getOrders())
    this.orders$ = this.store.select(getOrdersSelector).subscribe(data => this.orders = data)
  }

  viewOrder(order: Order): void{
    this.router.navigate(['/order/detail', order.id])
  }

  deleteOrder(order: Order): void{
    this.store.dispatch(removeOrder({id: order.id}))
  }

}
