import { __decorate } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { getCustomers } from 'src/app/store/actions/customer.actions';
import { getCustomersSelector } from 'src/app/store/selectors/customer.selectors';
import { Status } from '../resources/models/status.enum';
let OrderFormComponent = class OrderFormComponent {
    constructor(store, router, cartService) {
        this.store = store;
        this.router = router;
        this.cartService = cartService;
        this.onSubmitOrder = new EventEmitter();
        this.statuses = Status;
        this.orderForm = new FormGroup({
            id: new FormControl(''),
            createdDate: new FormControl(''),
            customerId: new FormControl(null, Validators.required),
            status: new FormControl('', Validators.required),
            totalCost: new FormControl(''),
            comment: new FormControl('')
        });
    }
    ngOnDestroy() {
        if (this.customers$) {
            this.customers$.unsubscribe();
        }
    }
    ngOnInit() {
        this.keysStatuses = Object.keys(this.statuses).filter(Number);
        this.store.dispatch(getCustomers());
        this.customers$ = this.store.select(getCustomersSelector).subscribe(data => this.customers = data);
        if (this.order) {
            this.populateOrderForm();
        }
        else {
            this.initOrderForm();
        }
    }
    populateOrderForm() {
        this.orderForm.patchValue({
            id: this.order.id,
            customerId: this.order.customerId,
            status: this.order.status,
            totalCost: this.order.totalCost,
            comment: this.order.comment
        });
    }
    initOrderForm() {
        this.orderForm.setValue({
            id: null,
            createdDate: null,
            customerId: null,
            status: null,
            totalCost: '',
            comment: ''
        });
    }
    addProduct() {
        this.cartService.setOrder = this.orderForm.value;
        this.router.navigate(['/order/add-product']);
    }
    getOrdersTotalCost() {
        if (this.orderItems) {
            return this.orderItems
                .map(x => x.count * x.product.price)
                .reduce((p, c) => p + c);
        }
        return 0;
    }
    get customer() {
        return this.orderForm.get('customerId');
    }
    get status() {
        return this.orderForm.get('status');
    }
    cancel() {
        this.cartService.clearOrder();
        this.router.navigate(['/orders']);
    }
    submit() {
        const order = this.orderForm.value;
        this.onSubmitOrder.emit(order);
    }
};
__decorate([
    Input()
], OrderFormComponent.prototype, "orderItems", void 0);
__decorate([
    Input()
], OrderFormComponent.prototype, "order", void 0);
__decorate([
    Output()
], OrderFormComponent.prototype, "onSubmitOrder", void 0);
OrderFormComponent = __decorate([
    Component({
        selector: 'app-order-form',
        templateUrl: './order-form.component.html',
        styleUrls: ['./order-form.component.scss']
    })
], OrderFormComponent);
export { OrderFormComponent };
//# sourceMappingURL=order-form.component.js.map