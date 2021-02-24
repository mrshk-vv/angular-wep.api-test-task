import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { addCustomer } from 'src/app/store/actions/customer.actions';
let CustomersItemComponent = class CustomersItemComponent {
    constructor(store) {
        this.store = store;
        this.customerForm = new FormGroup({
            name: new FormControl('', [Validators.required, Validators.minLength(6)]),
            address: new FormControl('', [Validators.required, Validators.minLength(10)]),
        });
    }
    ngOnInit() {
        this.initCustomerForm();
    }
    initCustomerForm() {
        this.customerForm.setValue({
            name: '',
            address: ''
        });
    }
    get name() {
        return this.customerForm.get('name');
    }
    get address() {
        return this.customerForm.get('address');
    }
    submit() {
        let customer = this.customerForm.value;
        this.store.dispatch(addCustomer({ customerToAdd: customer }));
    }
};
CustomersItemComponent = __decorate([
    Component({
        selector: 'app-customer-item',
        templateUrl: './customer-item.component.html',
        styleUrls: ['./customer-item.component.scss']
    })
], CustomersItemComponent);
export { CustomersItemComponent };
//# sourceMappingURL=customer-item.component.js.map