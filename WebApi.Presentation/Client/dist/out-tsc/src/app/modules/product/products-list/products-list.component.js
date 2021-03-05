import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { getProducts, removeProduct } from 'src/app/store/actions/products.actions';
import { getProductsSelector } from 'src/app/store/selectors/product.selectors';
let ProductsListComponent = class ProductsListComponent {
    constructor(store, router) {
        this.store = store;
        this.router = router;
    }
    ngOnDestroy() {
        this.products$.unsubscribe();
    }
    ngOnInit() {
        this.store.dispatch(getProducts());
        this.products$ = this.store.select(getProductsSelector).subscribe(data => this.products = data);
    }
    editProduct(product) {
        this.router.navigate(['/product/edit', product.id]);
    }
    deleteProduct(product) {
        let result = confirm('Are you sure want to delete this item');
        if (result) {
            this.store.dispatch(removeProduct({ id: product.id }));
        }
    }
    viewProduct(product) {
        this.router.navigate(['/product/detail', product.id]);
    }
};
ProductsListComponent = __decorate([
    Component({
        selector: 'app-products-list',
        templateUrl: './products-list.component.html',
        styleUrls: ['./products-list.component.scss']
    })
], ProductsListComponent);
export { ProductsListComponent };
//# sourceMappingURL=products-list.component.js.map