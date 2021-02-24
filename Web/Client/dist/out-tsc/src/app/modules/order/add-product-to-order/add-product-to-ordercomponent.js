import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { addProductToOrder } from 'src/app/store/actions/order.actions';
import { getAvailableProducts } from 'src/app/store/actions/products.actions';
import { getOrderSelector } from 'src/app/store/selectors/order.selectors';
import { getAvailableProductsSelector } from 'src/app/store/selectors/product.selectors';
import { Size } from '../../product/resources/models/product-size.enum';
let AddProductToOrderComponent = class AddProductToOrderComponent {
    constructor(store, cartService, router) {
        this.store = store;
        this.cartService = cartService;
        this.router = router;
        this.sizes = Size;
        this.orderItemForm = new FormGroup({
            productId: new FormControl('', Validators.required),
            productSize: new FormControl('', Validators.required),
            count: new FormControl(1, [Validators.required, Validators.min(1)]),
        });
    }
    ngOnDestroy() {
        if (this.order$) {
            this.order$.unsubscribe();
        }
        this.products$.unsubscribe();
    }
    initOrderItemForm() {
        this.orderItemForm.setValue({
            productId: null,
            productSize: null,
            count: 1
        });
    }
    ngOnInit() {
        this.initOrderItemForm();
        this.store.dispatch(getAvailableProducts());
        this.products$ = this.store.select(getAvailableProductsSelector).subscribe(data => this.products = data);
        this.order$ = this.store.select(getOrderSelector).subscribe(data => this.order = data);
        this.keysSizes = Object.keys(this.sizes).filter(Number);
    }
    setProduct(event) {
        let productId = event.target.value;
        this.selectedProduct = this.products.find(p => p.id === productId);
    }
    submit() {
        let orderItem = this.orderItemForm.value;
        orderItem = Object.assign(Object.assign({}, orderItem), { product: this.selectedProduct });
        if (this.selectedProduct.quantity < orderItem.count) {
            alert('There is no such quantity of goods in stock');
            return;
        }
        if (this.order) {
            let existingProduct = this.order.orderItems.find(x => x.productId == orderItem.productId &&
                x.productSize == orderItem.productSize);
            const index = this.order.orderItems.indexOf(existingProduct);
            if (existingProduct) {
                existingProduct = Object.assign(Object.assign({}, existingProduct), { count: existingProduct.count + orderItem.count });
                this.order = Object.assign(Object.assign({}, this.order), { orderItems: Object.assign([], this.order.orderItems, { [index]: existingProduct }) });
            }
            else {
                orderItem.orderId = this.order.id;
                this.order = Object.assign(Object.assign({}, this.order), { orderItems: [
                        ...this.order.orderItems,
                        orderItem
                    ] });
            }
            this.store.dispatch(addProductToOrder({ orderWithNewItem: this.order }));
            this.router.navigate(['/order/edit', this.order.id]);
        }
        else {
            let order = this.cartService.getOrder;
            orderItem.orderId = order.id;
            this.cartService.addProduct(orderItem);
            this.router.navigate(['/order/create']);
        }
    }
    get product() {
        return this.orderItemForm.get('productId');
    }
    get count() {
        return this.orderItemForm.get('count');
    }
    get productSize() {
        return this.orderItemForm.get('productSize');
    }
};
AddProductToOrderComponent = __decorate([
    Component({
        selector: 'app-add-product-to-order',
        templateUrl: './add-product-to-order.component.html',
        styleUrls: ['./add-product-to-order.component.scss']
    })
], AddProductToOrderComponent);
export { AddProductToOrderComponent };
//# sourceMappingURL=add-product-to-ordercomponent.js.map