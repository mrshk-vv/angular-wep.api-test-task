import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Guid } from 'guid-typescript';
import { Subscription } from 'rxjs/internal/Subscription';
import { getCustomers } from 'src/app/store/actions/customer.actions';
import { addOrder, removeSelectedOrder } from 'src/app/store/actions/order.actions';
import { CustomerState } from 'src/app/store/reducers/customer.reducer';
import { OrderState } from 'src/app/store/reducers/order.reducer';
import { getCustomersSelector } from 'src/app/store/selectors/customer.selectors';
import { getOrderSelector } from 'src/app/store/selectors/order.selectors';
import { Customer } from '../../customer/resources/models/customer.model';
import { OrderItem } from '../resources/models/order-item.model';
import { Order } from '../resources/models/order.model';
import { Status } from '../resources/models/status.enum';
import { CartService } from '../resources/services/cart.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements OnInit {

  order: Order
  orderItems: OrderItem[]

  constructor(private store: Store<OrderState>,
              public cartService: CartService) {
  }

  ngOnInit(): void {
    this.store.dispatch(removeSelectedOrder())
    this.orderItems = this.cartService.getCart as OrderItem[]

    if(this.cartService.getOrder)
      this.order = this.cartService.getOrder as Order
  }

  addOrder(order: Order): void{
    order.orderItems = this.cartService.getCart

    this.store.dispatch(addOrder({orderToAdd: order}))
  }
}
