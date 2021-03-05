import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/internal/Subscription';
import { getCustomers } from 'src/app/store/actions/customer.actions';
import { updateOrder } from 'src/app/store/actions/order.actions';
import { getCustomersSelector } from 'src/app/store/selectors/customer.selectors';
import { Customer } from '../../customer/resources/models/customer.model';
import { OrderItem } from '../resources/models/order-item.model';
import { Order } from '../resources/models/order.model';
import { Status } from '../resources/models/status.enum';
import { CartService } from '../resources/services/cart.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit, OnDestroy {

  @Input() orderItems : OrderItem[]
  @Input() order: Order
  @Output() onSubmitOrder: EventEmitter<Order> = new EventEmitter<Order>()

  statuses = Status
  keysStatuses: string[]

  customers$: Subscription
  customers: Customer[]

  orderForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    createdDate: new FormControl(''),
    customerId: new FormControl(null, Validators.required),
    status: new FormControl('', Validators.required),
    totalCost: new FormControl(''),
    comment: new FormControl('')
  })

  constructor(private store: Store,
              private router: Router,
              private cartService: CartService) { }
  ngOnDestroy(): void {
    if(this.customers$){
      this.customers$.unsubscribe()
    }
  }

  ngOnInit(): void {
    this.keysStatuses = Object.keys(this.statuses).filter(Number)

    this.store.dispatch(getCustomers())
    this.customers$ = this.store.select(getCustomersSelector).subscribe(data => this.customers = data)

    if(this.order){
      this.populateOrderForm()
    }else{
      this.initOrderForm()
    }
  }

  populateOrderForm(): void {
    this.orderForm.patchValue({
      id: this.order.id,
      customerId: this.order.customerId,
      status: this.order.status,
      totalCost: this.order.totalCost,
      comment: this.order.comment
    })
  }

  initOrderForm(): void{
    this.orderForm.setValue({
      id: null,
      createdDate: null,
      customerId: null,
      status: null,
      totalCost: '',
      comment: ''
    })
  }

  addProduct(){
    this.cartService.setOrder = this.orderForm.value as Order
    this.router.navigate(['/order/add-product'])
  }

  getOrdersTotalCost() : number {
    if(this.orderItems){
      return this.orderItems
      .map(x => x.count * x.product.price)
      .reduce((p,c) => p + c)
    }

    return 0
  }

  get customer(){
    return this.orderForm.get('customerId') as FormGroup
  }

  get status(){
    return this.orderForm.get('status') as FormGroup
  }

  cancel(){
    this.cartService.clearOrder()
    this.router.navigate(['/orders'])
  }

  submit(){
    const order = this.orderForm.value
    this.onSubmitOrder.emit(order)
  }

}
