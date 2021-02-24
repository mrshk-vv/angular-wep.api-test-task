import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { addOrder, removeSelectedOrder } from 'src/app/store/actions/order.actions';
let CreateOrderComponent = class CreateOrderComponent {
    constructor(store, cartService) {
        this.store = store;
        this.cartService = cartService;
    }
    ngOnInit() {
        this.store.dispatch(removeSelectedOrder());
        this.orderItems = this.cartService.getCart;
        if (this.cartService.getOrder)
            this.order = this.cartService.getOrder;
    }
    addOrder(order) {
        order.orderItems = this.cartService.getCart;
        this.store.dispatch(addOrder({ orderToAdd: order }));
    }
};
CreateOrderComponent = __decorate([
    Component({
        selector: 'app-create-order',
        templateUrl: './create-order.component.html',
        styleUrls: ['./create-order.component.scss']
    })
], CreateOrderComponent);
export { CreateOrderComponent };
//# sourceMappingURL=create-order.component.js.map