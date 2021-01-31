import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Guid } from 'guid-typescript';
import { Subscription } from 'rxjs';
import { getCustomers } from 'src/app/store/actions/customer.actions';
import { updateOrder } from 'src/app/store/actions/order.actions';
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
export class UpdateOrderComponent implements OnInit {

  statuses = Status
  keysStatuses: string[]

  orderForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    createdDate: new FormControl(''),
    customerId: new FormControl(null, Validators.required),
    status: new FormControl('', Validators.required),
    totalCost: new FormControl(''),
    comment: new FormControl('')
  })

  orderId: string
  order: Order
  order$ : Subscription
  customers$: Subscription
  customers: Customer[]

  constructor(private activatedRoute: ActivatedRoute,
              private store: Store<CustomerState>,
              private router: Router) {
    activatedRoute.params.subscribe(params => this.orderId = params['id']).unsubscribe()
  }

  ngOnDestroy(): void {
    if(this.order$){
      this.order$.unsubscribe()
    }

    this.customers$.unsubscribe()
  }

  ngOnInit(): void {
    this.store.dispatch(getCustomers())
    this.customers$ = this.store.select(getCustomersSelector).subscribe(data => this.customers = data)
    this.keysStatuses = Object.keys(this.statuses).filter(Number)

    if(this.orderId != null){
      this.order$ = this.store.select(getOrderSelector).subscribe(data => this.order = data)

      this.populateOrderForm()
    }
  }

  populateOrderForm(): void {
    this.orderForm.patchValue({
      id: this.order.id,
      createdDate: this.order.createdDate,
      status: this.order.status,
      totalCost: this.order.totalCost,
      comment: this.order.comment
    })
    this.orderForm.controls['customerId'].setValue(this.order.customerId, {onlySelf: true});
  }

  get customer(){
    return this.orderForm.get('customerId') as FormGroup
  }

  get status(){
    return this.orderForm.get('status') as FormGroup
  }

  cancel(){
    this.router.navigate(['/products'])
  }

  submit(){
    this.store.dispatch(updateOrder({orderToUpdate: this.order}))
  }
}
