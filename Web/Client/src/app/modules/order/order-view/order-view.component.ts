import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { getOrder } from 'src/app/store/actions/order.actions';
import { OrderState } from 'src/app/store/reducers/order.reducer';
import { getOrderSelector } from 'src/app/store/selectors/order.selectors';
import { Order } from '../resources/models/order.model';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.scss']
})
export class OrderViewComponent implements OnInit {

  orderId: string
  order: Order

  order$ = this.store.select(getOrderSelector).subscribe(
    data => this.order = data
  )

  constructor(private activatedRoute: ActivatedRoute,
              private store: Store<OrderState>,
              private router: Router) {
                activatedRoute.params.subscribe(params => this.orderId = params['id']).unsubscribe();
              }
  ngOnDestroy(): void {
    this.order$.unsubscribe()
  }

  ngOnInit(): void {
    console.log(this.order)
    this.store.dispatch(getOrder({id: this.orderId}))
  }

  editOrder(){
    this.router.navigate(['/order/edit', this.order.id])
  }

}
