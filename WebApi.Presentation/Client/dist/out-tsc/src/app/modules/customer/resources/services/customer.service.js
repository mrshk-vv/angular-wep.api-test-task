import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
let CustomerService = class CustomerService {
    constructor(http) {
        this.http = http;
        this.customerApiUrl = `${environment.apiBaseUrl}Customer`;
    }
    getCustomer(customerId) {
        return this.http.get(`${this.customerApiUrl}/GetCustomer/${customerId}`);
    }
    getCustomers() {
        return this.http.get(`${this.customerApiUrl}/GetCustomers`);
    }
    addCustomer(customer) {
        return this.http.post(`${this.customerApiUrl}/CreateCustomer`, customer);
    }
    updateCustomer(customer) {
        return this.http.put(`${this.customerApiUrl}/UpdateCustomer/${customer.id}`, customer);
    }
    removeCustomer(customerId) {
        return this.http.delete(`${this.customerApiUrl}/RemoveCustomer/${customerId}`);
    }
};
CustomerService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], CustomerService);
export { CustomerService };
//# sourceMappingURL=customer.service.js.map