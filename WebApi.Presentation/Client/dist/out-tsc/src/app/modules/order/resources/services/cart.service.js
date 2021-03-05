import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
let CartService = class CartService {
    constructor() {
        this.cart = 'cart';
        this.order = 'order';
        this.orderItems = [];
        this.cartItems = new BehaviorSubject(this.getCart);
    }
    createCart() {
        localStorage.setItem(this.cart, null);
    }
    createOrder() {
        this.clearOrder();
        localStorage.setItem(this.order, JSON.stringify({ id: null }));
    }
    clearOrder() {
        localStorage.clear();
    }
    set setCart(orderItems) {
        this.cartItems.next(orderItems);
        localStorage.setItem(this.cart, JSON.stringify(orderItems));
    }
    get getCart() {
        return JSON.parse(localStorage.getItem(this.cart));
    }
    set setOrder(order) {
        localStorage.setItem(this.order, JSON.stringify(order));
    }
    get getOrder() {
        return JSON.parse(localStorage.getItem(this.order));
    }
    addProduct(orderItem) {
        let cart = this.getCart;
        if (cart === null) {
            this.createCart();
            this.orderItems.push(orderItem);
            this.setCart = this.orderItems;
        }
        else {
            this.orderItems = this.getCart;
            const existingProductIndex = this.orderItems.findIndex(i => i.productId === orderItem.productId &&
                i.productSize === orderItem.productSize);
            if (existingProductIndex != null && existingProductIndex != -1) {
                this.orderItems[existingProductIndex].count += orderItem.count;
            }
            else {
                this.orderItems.push(orderItem);
            }
            this.setCart = this.orderItems;
            this.orderItems = [];
        }
    }
    deleteProductInCart(orderItem) {
        this.orderItems = this.getCart;
        let orderItemIndex = this.orderItems.findIndex(i => i.productId = orderItem.productId);
        if (orderItemIndex != -1) {
            this.orderItems.splice(orderItemIndex, 1);
        }
        this.setCart = this.orderItems;
    }
};
CartService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], CartService);
export { CartService };
//# sourceMappingURL=cart.service.js.map