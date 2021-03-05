import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
let ProductService = class ProductService {
    constructor(http) {
        this.http = http;
        this.productApiUrl = `${environment.apiBaseUrl}Product`;
    }
    getProduct(id) {
        return this.http.get(`${this.productApiUrl}/GetProduct/${id}`);
    }
    getProducts() {
        return this.http.get(`${this.productApiUrl}/GetProducts`);
    }
    getAvailableProducts() {
        return this.http.get(`${this.productApiUrl}/GetAvailableProducts`);
    }
    addProduct(product) {
        return this.http.post(`${this.productApiUrl}/AddProduct`, product);
    }
    updateProduct(product) {
        return this.http.put(`${this.productApiUrl}/UpdateProduct/${product.id}`, product);
    }
    removeProduct(productId) {
        return this.http.delete(`${this.productApiUrl}/RemoveProduct/${productId}`);
    }
};
ProductService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ProductService);
export { ProductService };
//# sourceMappingURL=product.service.js.map