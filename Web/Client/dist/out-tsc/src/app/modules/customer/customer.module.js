import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersItemComponent } from './customer-item/customer-item.component';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { RouterModule } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { customerReducer, CUSTOMER_REDUCER_NODE } from 'src/app/store/reducers/customer.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CustomerEffects } from 'src/app/store/effects/customer.effects';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
const routes = [
    {
        path: 'customers',
        component: CustomersListComponent
    },
    {
        path: 'customer/create',
        component: CustomersItemComponent
    }
];
let CustomerModule = class CustomerModule {
};
CustomerModule = __decorate([
    NgModule({
        declarations: [
            CustomersListComponent,
            CustomersItemComponent,
            CustomerComponent,
        ],
        imports: [
            CommonModule,
            HttpClientModule,
            ReactiveFormsModule,
            SharedModule,
            RouterModule.forChild(routes),
            StoreModule.forFeature(CUSTOMER_REDUCER_NODE, customerReducer),
            EffectsModule.forFeature([CustomerEffects])
        ]
    })
], CustomerModule);
export { CustomerModule };
//# sourceMappingURL=customer.module.js.map