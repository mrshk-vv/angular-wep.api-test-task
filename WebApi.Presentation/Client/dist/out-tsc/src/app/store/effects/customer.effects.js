import { __decorate } from "tslib";
import { Injectable } from "@angular/core";
import { createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/internal/operators';
import * as customersActions from 'src/app/store/actions/customer.actions';
let CustomerEffects = class CustomerEffects {
    constructor(actions$, customer, router) {
        this.actions$ = actions$;
        this.customer = customer;
        this.router = router;
        this.getCustomer$ = createEffect(() => this.actions$.pipe(ofType(customersActions.getCustomer), switchMap(action => this.customer.getCustomer(action.id).pipe(map(customer => customersActions.getCustomerSuccess({ customer })), catchError(err => of(customersActions.getCustomerFailure(err)))))));
        this.getCustomers$ = createEffect(() => this.actions$.pipe(ofType(customersActions.getCustomers), switchMap(action => this.customer.getCustomers()
            .pipe(map(customers => customersActions.getCustomersSuccess({ customers })), catchError(err => of(customersActions.getCustomersFailure(err)))))));
        this.addCustomer$ = createEffect(() => this.actions$.pipe(ofType(customersActions.addCustomer), switchMap(action => this.customer.addCustomer(action.customerToAdd)
            .pipe(map(addedCustomer => customersActions.addCustomerSuccess({ addedCustomer })), catchError(err => of(customersActions.addCustomerFailure(err)))))));
        this.updateCustomer$ = createEffect(() => this.actions$.pipe(ofType(customersActions.updateCustomer), switchMap(action => this.customer.updateCustomer(action.customerToUpdate)
            .pipe(map(updatedCustomer => customersActions.updateCustomerSuccess({
            updatedCustomer: {
                id: updatedCustomer.id,
                changes: updatedCustomer
            }
        })), catchError(err => of(customersActions.updateCustomerFailure(err)))))));
        this.removeCustomer$ = createEffect(() => this.actions$.pipe(ofType(customersActions.removeCustomer), switchMap(action => this.customer.removeCustomer(action.id)
            .pipe(map(() => customersActions.removeCustomerSuccess()), catchError(err => of(customersActions.removeCustomerFailure(err)))))));
        this.addOrUpdateCustomerRedirect$ = createEffect(() => this.actions$.pipe(ofType(customersActions.addCustomerSuccess, customersActions.updateCustomerSuccess), tap(() => this.router.navigate(['/customers']))), { dispatch: false });
    }
};
CustomerEffects = __decorate([
    Injectable()
], CustomerEffects);
export { CustomerEffects };
//# sourceMappingURL=customer.effects.js.map