import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/internal/operators';
import { CartService } from "src/app/modules/order/resources/services/cart.service";

import { OrderService } from 'src/app/modules/order/resources/services/order.service';
import * as ordersActions from 'src/app/store/actions/order.actions';

@Injectable()
export class OrderEffects{

  getOrder$ = createEffect(() => this.actions$.pipe(
    ofType(ordersActions.getOrder),
    switchMap(action => this.order.getOrder(
      action.id
    ).pipe(
      map(order => ordersActions.getOrderSuccess({order})),
      catchError(err => of(ordersActions.getOrderFailure(err)))
    )
  )))

  getOrders$ = createEffect(() => this.actions$.pipe(
    ofType(ordersActions.getOrders),
    switchMap(action => this.order.getOrders()
    .pipe(
      map(orders => ordersActions.getOrdersSuccess({orders})),
      catchError(err => of(ordersActions.getOrdersFailure(err)))
    )
  )))

  addOrder$ = createEffect(() => this.actions$.pipe(
    ofType(ordersActions.addOrder),
    switchMap(action => this.order.addOrder(action.orderToAdd)
    .pipe(
      map(addedOrder => ordersActions.addOrderSuccess({addedOrder})),
      catchError(err => of(ordersActions.addOrderFailure(err)))
    )
  )))


  updateOrder$ = createEffect(() => this.actions$.pipe(
    ofType(ordersActions.updateOrder),
    switchMap(action => this.order.updateOrder(action.orderToUpdate)
    .pipe(
      map(updatedOrder => ordersActions.updateOrderSuccess(
        {
          updatedOrder: {
          id: updatedOrder.id,
          changes: updatedOrder
          }
        }
      )),
      catchError(err => of(ordersActions.updateOrderFailure(err)))
    )
  )))

  removeOrder$ = createEffect(() => this.actions$.pipe(
    ofType(ordersActions.removeOrder),
    switchMap(action => this.order.removeOrder(action.id)
    .pipe(
      map(() => ordersActions.removeOrderSuccess()),
      catchError(err => of(ordersActions.removeOrderFailure(err)))
    )
  )))

  addOrderOrUpdateSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(ordersActions.addOrderSuccess,
           ordersActions.updateOrderSuccess),
    tap(() => this.router.navigate(['/orders']))
  ), {dispatch: false})

  clearCartAfterCreateOrder$ = createEffect(() => this.actions$.pipe(
    ofType(ordersActions.addOrderSuccess),
    tap(() => this.cartService.clearOrder())
  ), {dispatch: false})

  constructor(private actions$: Actions,
              private order: OrderService,
              private router: Router,
              private cartService: CartService){}
}
