import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
let OrderService = class OrderService {
    constructor(http) {
        this.http = http;
        this.orderApiUrl = `${environment.apiBaseUrl}Order`;
    }
    getOrder(orderId) {
        return this.http.get(`${this.orderApiUrl}/GetOrder/${orderId}`);
    }
    getOrders() {
        return this.http.get(`${this.orderApiUrl}/GetOrders`);
    }
    addOrder(order) {
        return this.http.post(`${this.orderApiUrl}/CreateOrder`, order);
    }
    updateOrder(order) {
        return this.http.put(`${this.orderApiUrl}/UpdateOrder/${order.id}`, order);
    }
    removeOrder(orderId) {
        return this.http.delete(`${this.orderApiUrl}/RemoveOrder/${orderId}`);
    }
};
OrderService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], OrderService);
export { OrderService };
//# sourceMappingURL=order.service.js.map