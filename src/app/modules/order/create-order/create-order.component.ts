import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Guid } from 'guid-typescript';
import { Subscription } from 'rxjs/internal/Subscription';
import { getCustomers } from 'src/app/store/actions/customer.actions';
import { addOrder, removeSelectedOrder } from 'src/app/store/actions/order.actions';
import { CustomerState } from 'src/app/store/reducers/customer.reducer';
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

  statuses = Status
  keysStatuses: string[]

  orderForm: FormGroup = new FormGroup({
    customerId: new FormControl(null, Validators.required),
    status: new FormControl('', Validators.required),
    totalCost: new FormControl(''),
    comment: new FormControl('')
  })

  orderId: string
  customers$: Subscription
  customers: Customer[]
  orderItems: OrderItem[]

  constructor(private store: Store,
              private router: Router,
              public cartService: CartService) {
  }

  ngOnDestroy(): void {
    this.customers$.unsubscribe()
  }

  ngOnInit(): void {
    this.orderItems = this.cartService.getCart

    this.store.dispatch(removeSelectedOrder())

    this.store.dispatch(getCustomers())
    this.customers$ = this.store.select(getCustomersSelector).subscribe(data => this.customers = data)
    this.keysStatuses = Object.keys(this.statuses).filter(Number)

    if(this.cartService.getOrder){
      let order = this.cartService.getOrder as Order
      this.populateOrderForm(order)
    }else{
      this.initOrderForm()
    }
  }

  populateOrderForm(order: Order): void {
    this.orderForm.patchValue({
      id: order.id,
      customerId: order.customerId,
      status: order.status,
      totalCost: order.totalCost,
      comment: order.comment
    })
  }


  initOrderForm(): void{
    this.orderForm.setValue({
      customerId: null,
      status: null,
      totalCost: '',
      comment: ''
    })
  }

  addProduct(): void{
    this.cartService.setOrder = this.orderForm.value as Order
    this.router.navigate(['/order/add-product'])
  }

  getOrdersTotalCost(){
    let cart = this.cartService.getCart
    if(cart){
      return cart.map(x => x.count * x.product.price).reduce((p,c) => {return p + c})
    }

    return 0
  }

  submit(): void{
    let order = this.cartService.getOrder as Order
    order.orderItems = this.cartService.getCart
    order.comment = this.comment.value

    this.store.dispatch(addOrder({orderToAdd: order}))
  }

  cancel(): void{
    this.cartService.clearOrder()
    this.router.navigate(['/orders'])
  }

  get customer(){
    return this.orderForm.get('customerId') as FormGroup
  }

  get status(){
    return this.orderForm.get('status') as FormGroup
  }

  get comment(){
    return this.orderForm.get('comment') as FormGroup
  }
}
