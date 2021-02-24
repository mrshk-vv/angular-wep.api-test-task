import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { updateOrder } from 'src/app/store/actions/order.actions';
import { getOrderSelector } from 'src/app/store/selectors/order.selectors';
let UpdateOrderComponent = class UpdateOrderComponent {
    constructor(activatedRoute, store, router) {
        this.activatedRoute = activatedRoute;
        this.store = store;
        this.router = router;
        activatedRoute.params.subscribe(params => this.orderId = params['id']).unsubscribe();
        if (this.orderId) {
            this.order$ = this.store.select(getOrderSelector).subscribe(data => this.order = data);
            if (!this.order) {
                this.router.navigate(['/order/detail', this.orderId]);
            }
        }
    }
    ngOnDestroy() {
        if (this.order) {
            this.order$.unsubscribe();
        }
    }
    ngOnInit() {
    }
    updateOrder(updatedOrder) {
        this.order = Object.assign(Object.assign({}, this.order), { customerId: updatedOrder.customerId, status: updatedOrder.status, comment: updatedOrder.comment });
        this.store.dispatch(updateOrder({ orderToUpdate: this.order }));
    }
};
UpdateOrderComponent = __decorate([
    Component({
        selector: 'app-update-order',
        templateUrl: './update-order.component.html',
        styleUrls: ['./update-order.component.scss']
    })
], UpdateOrderComponent);
export { UpdateOrderComponent };
//# sourceMappingURL=update-order.component.js.map