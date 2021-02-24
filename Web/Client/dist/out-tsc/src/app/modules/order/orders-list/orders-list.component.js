import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { getOrders, removeOrder } from 'src/app/store/actions/order.actions';
import { getOrdersSelector } from 'src/app/store/selectors/order.selectors';
let OrdersListComponent = class OrdersListComponent {
    constructor(store, router, cartService) {
        this.store = store;
        this.router = router;
        this.cartService = cartService;
    }
    ngOnDestroy() {
        this.orders$.unsubscribe();
    }
    ngOnInit() {
        this.store.dispatch(getOrders());
        this.orders$ = this.store.select(getOrdersSelector).subscribe(data => this.orders = data);
    }
    newOrder() {
        this.cartService.createOrder();
        this.router.navigate(['/order/create']);
    }
    viewOrder(order) {
        this.router.navigate(['/order/detail', order.id]);
    }
    deleteOrder(order) {
        this.store.dispatch(removeOrder({ id: order.id }));
    }
};
OrdersListComponent = __decorate([
    Component({
        selector: 'app-orders-list',
        templateUrl: './orders-list.component.html',
        styleUrls: ['./orders-list.component.scss']
    })
], OrdersListComponent);
export { OrdersListComponent };
//# sourceMappingURL=orders-list.component.js.map