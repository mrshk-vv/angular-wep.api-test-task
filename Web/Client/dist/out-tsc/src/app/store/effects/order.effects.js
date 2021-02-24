import { __decorate } from "tslib";
import { Injectable } from "@angular/core";
import { createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/internal/operators';
import * as ordersActions from 'src/app/store/actions/order.actions';
let OrderEffects = class OrderEffects {
    constructor(actions$, order, router, cartService) {
        this.actions$ = actions$;
        this.order = order;
        this.router = router;
        this.cartService = cartService;
        this.getOrder$ = createEffect(() => this.actions$.pipe(ofType(ordersActions.getOrder), switchMap(action => this.order.getOrder(action.id).pipe(map(order => ordersActions.getOrderSuccess({ order })), catchError(err => of(ordersActions.getOrderFailure(err)))))));
        this.getOrders$ = createEffect(() => this.actions$.pipe(ofType(ordersActions.getOrders), switchMap(action => this.order.getOrders()
            .pipe(map(orders => ordersActions.getOrdersSuccess({ orders })), catchError(err => of(ordersActions.getOrdersFailure(err)))))));
        this.addOrder$ = createEffect(() => this.actions$.pipe(ofType(ordersActions.addOrder), switchMap(action => this.order.addOrder(action.orderToAdd)
            .pipe(map(addedOrder => ordersActions.addOrderSuccess({ addedOrder })), catchError(err => of(ordersActions.addOrderFailure(err)))))));
        this.updateOrder$ = createEffect(() => this.actions$.pipe(ofType(ordersActions.updateOrder), switchMap(action => this.order.updateOrder(action.orderToUpdate)
            .pipe(map(updatedOrder => ordersActions.updateOrderSuccess({
            updatedOrder: {
                id: updatedOrder.id,
                changes: updatedOrder
            }
        })), catchError(err => of(ordersActions.updateOrderFailure(err)))))));
        this.removeOrder$ = createEffect(() => this.actions$.pipe(ofType(ordersActions.removeOrder), switchMap(action => this.order.removeOrder(action.id)
            .pipe(map(() => ordersActions.removeOrderSuccess()), catchError(err => of(ordersActions.removeOrderFailure(err)))))));
        this.addOrderOrUpdateSuccess$ = createEffect(() => this.actions$.pipe(ofType(ordersActions.addOrderSuccess, ordersActions.updateOrderSuccess), tap(() => this.router.navigate(['/orders']))), { dispatch: false });
        this.clearCartAfterCreateOrder$ = createEffect(() => this.actions$.pipe(ofType(ordersActions.addOrderSuccess), tap(() => this.cartService.clearOrder())), { dispatch: false });
    }
};
OrderEffects = __decorate([
    Injectable()
], OrderEffects);
export { OrderEffects };
//# sourceMappingURL=order.effects.js.map