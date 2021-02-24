import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { addProduct, getProduct, updateProduct } from 'src/app/store/actions/products.actions';
import { getProductSelector } from 'src/app/store/selectors/product.selectors';
import { Category } from '../resources/models/product-category.enum';
let ProductItemComponent = class ProductItemComponent {
    constructor(activatedRoute, store, router) {
        this.activatedRoute = activatedRoute;
        this.store = store;
        this.router = router;
        this.categories = Category;
        this.productForm = new FormGroup({
            id: new FormControl(),
            createdDate: new FormControl(),
            name: new FormControl('', [Validators.required, Validators.minLength(2)]),
            category: new FormControl('', [Validators.required]),
            price: new FormControl(1, [Validators.required, Validators.min(1)]),
            quantity: new FormControl(1, [Validators.required, Validators.min(1)]),
            description: new FormControl('')
        });
        activatedRoute.params.subscribe(params => this.productId = params['id']).unsubscribe();
    }
    ngOnDestroy() {
        if (this.product$) {
            this.product$.unsubscribe();
        }
    }
    ngOnInit() {
        if (this.productId) {
            this.product$ = this.store.select(getProductSelector).subscribe(data => this.product = data);
            this.store.dispatch(getProduct({ id: this.productId }));
            this.store.select(getProductSelector).subscribe(data => this.product = data);
        }
        if (this.product === null) {
            this.router.navigate(['/product/detail', this.productId]);
        }
        this.keysCategories = Object.keys(this.categories).filter(Number);
        this.product ? this.populateProductForm() : this.initProductForm();
    }
    populateProductForm() {
        this.productForm.patchValue({
            id: this.productId,
            createdDate: this.product.createdDate,
            name: this.product.name,
            category: this.product.category.valueOf(),
            price: this.product.price,
            quantity: this.product.quantity,
            description: this.product.description
        });
    }
    initProductForm() {
        this.productForm.setValue({
            name: '',
            category: null,
            price: 1,
            quantity: 1,
            description: ''
        });
    }
    get name() {
        return this.productForm.get('name');
    }
    get category() {
        return this.productForm.get('category');
    }
    get price() {
        return this.productForm.get('price');
    }
    get quantity() {
        return this.productForm.get('quantity');
    }
    cancel() {
        this.router.navigate(['/products']);
    }
    submit() {
        this.product = this.productForm.value;
        if (this.productId) {
            this.store.dispatch(updateProduct({ productToUpdate: this.product }));
        }
        else {
            this.store.dispatch(addProduct({ productToAdd: this.product }));
        }
    }
};
ProductItemComponent = __decorate([
    Component({
        selector: 'app-product-item',
        templateUrl: './product-item.component.html',
        styleUrls: ['./product-item.component.scss']
    })
], ProductItemComponent);
export { ProductItemComponent };
//# sourceMappingURL=product-item.component.js.map