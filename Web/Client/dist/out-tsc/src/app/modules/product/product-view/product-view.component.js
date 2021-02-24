import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { getProduct } from 'src/app/store/actions/products.actions';
import { getProductSelector } from 'src/app/store/selectors/product.selectors';
let ProductViewComponent = class ProductViewComponent {
    constructor(activatedRoute, store, router) {
        this.activatedRoute = activatedRoute;
        this.store = store;
        this.router = router;
        this.product$ = this.store.select(getProductSelector).subscribe(data => this.product = data);
        activatedRoute.params.subscribe(params => this.productId = params['id']).unsubscribe();
    }
    ngOnDestroy() {
        this.product$.unsubscribe();
    }
    ngOnInit() {
        this.store.dispatch(getProduct({ id: this.productId }));
    }
    editProduct() {
        this.router.navigate(['/product/edit', this.product.id]);
    }
};
ProductViewComponent = __decorate([
    Component({
        selector: 'app-product-view',
        templateUrl: './product-view.component.html',
        styleUrls: ['./product-view.component.scss']
    })
], ProductViewComponent);
export { ProductViewComponent };
//# sourceMappingURL=product-view.component.js.map