import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/internal/operators';

import { CustomerService } from 'src/app/modules/customer/resources/services/customer.service';
import * as customersActions from 'src/app/store/actions/customer.actions';

@Injectable()
export class CustomerEffects{

  getCustomer$ = createEffect(() => this.actions$.pipe(
    ofType(customersActions.getCustomer),
    switchMap(action => this.customer.getCustomer(
      action.id
    ).pipe(
      map(customer => customersActions.getCustomerSuccess({customer})),
      catchError(err => of(customersActions.getCustomerFailure(err)))
    )
  )))

  getCustomers$ = createEffect(() => this.actions$.pipe(
    ofType(customersActions.getCustomers),
    switchMap(action => this.customer.getCustomers()
    .pipe(
      map(customers => customersActions.getCustomersSuccess({customers})),
      catchError(err => of(customersActions.getCustomersFailure(err)))
    )
  )))

  addCustomer$ = createEffect(() => this.actions$.pipe(
    ofType(customersActions.addCustomer),
    switchMap(action => this.customer.addCustomer(action.customerToAdd)
    .pipe(
      map(addedCustomer => customersActions.addCustomerSuccess({addedCustomer})),
      catchError(err => of(customersActions.addCustomerFailure(err)))
    )
  )))


  updateCustomer$ = createEffect(() => this.actions$.pipe(
    ofType(customersActions.updateCustomer),
    switchMap(action => this.customer.updateCustomer(action.customerToUpdate)
    .pipe(
      map(updatedCustomer => customersActions.updateCustomerSuccess(
        {
          updatedCustomer: {
          id: updatedCustomer.id,
          changes: updatedCustomer
          }
        }
      )),
      catchError(err => of(customersActions.updateCustomerFailure(err)))
    )
  )))

  removeCustomer$ = createEffect(() => this.actions$.pipe(
    ofType(customersActions.removeCustomer),
    switchMap(action => this.customer.removeCustomer(action.id)
    .pipe(
      map(() => customersActions.removeCustomerSuccess()),
      catchError(err => of(customersActions.removeCustomerFailure(err)))
    )
  )))

  addOrUpdateCustomerRedirect$ = createEffect(() => this.actions$.pipe(
    ofType(customersActions.addCustomerSuccess,
           customersActions.updateCustomerSuccess),
           tap(() => this.router.navigate(['/customers']))
  ),{dispatch: false})



  constructor(private actions$: Actions, private customer: CustomerService, private router: Router){}
}
