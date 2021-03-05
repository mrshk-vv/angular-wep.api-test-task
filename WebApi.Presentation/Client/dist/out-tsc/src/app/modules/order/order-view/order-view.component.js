import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { getOrder } from 'src/app/store/actions/order.actions';
import { getOrderSelector } from 'src/app/store/selectors/order.selectors';
let OrderViewComponent = class OrderViewComponent {
    constructor(activatedRoute, store, router) {
        this.activatedRoute = activatedRoute;
        this.store = store;
        this.router = router;
        this.order$ = this.store.select(getOrderSelector).subscribe(data => this.order = data);
        activatedRoute.params.subscribe(params => this.orderId = params['id']).unsubscribe();
    }
    ngOnDestroy() {
        this.order$.unsubscribe();
    }
    ngOnInit() {
        this.store.dispatch(getOrder({ id: this.orderId }));
    }
    editOrder() {
        this.router.navigate(['/order/edit', this.order.id]);
    }
};
OrderViewComponent = __decorate([
    Component({
        selector: 'app-order-view',
        templateUrl: './order-view.component.html',
        styleUrls: ['./order-view.component.scss']
    })
], OrderViewComponent);
export { OrderViewComponent };
//# sourceMappingURL=order-view.component.js.map