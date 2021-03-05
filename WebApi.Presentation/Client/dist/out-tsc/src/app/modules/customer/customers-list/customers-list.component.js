import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { getCustomers } from 'src/app/store/actions/customer.actions';
import { getCustomersSelector } from 'src/app/store/selectors/customer.selectors';
import { removeCustomer as remove } from 'src/app/store/actions/customer.actions';
let CustomersListComponent = class CustomersListComponent {
    constructor(store) {
        this.store = store;
        this.customers$ = this.store.select(getCustomersSelector);
    }
    ngOnInit() {
        this.store.dispatch(getCustomers());
    }
    removeCustomer(customer) {
        this.store.dispatch(remove({ id: customer.id }));
    }
    getTotalOrderedCost(orders) {
        if (orders.length != 0) {
            return orders.map(x => x.totalCost).reduce((p, c) => p + c);
        }
        return 0;
    }
};
CustomersListComponent = __decorate([
    Component({
        selector: 'app-customers-list',
        templateUrl: './customers-list.component.html',
        styleUrls: ['./customers-list.component.scss']
    })
], CustomersListComponent);
export { CustomersListComponent };
//# sourceMappingURL=customers-list.component.js.map