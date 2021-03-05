import { createReducer, on } from '@ngrx/store';

import { AppState } from '../states/app-state';

import * as customerActions from 'src/app/store/actions/customer.actions'
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Customer } from 'src/app/modules/Customer/resources/models/Customer.model';

export const CUSTOMER_REDUCER_NODE = 'customer'

export interface CustomerState extends AppState, EntityState<Customer> {
  selectedCustomer: Customer
  error: undefined
}

export const customerAdapter: EntityAdapter<Customer> = createEntityAdapter<Customer>()

export const initialCustomerState = customerAdapter.getInitialState({
  selectedCustomer: null,
  error: null
})

export const customerReducer = createReducer(
  initialCustomerState,

  on(customerActions.getCustomersSuccess, (state, action) =>
    customerAdapter.setAll(action.customers, state)
  ),
  on(customerActions.getCustomersFailure, (state, action) => {
    return{
      ...state,
      error: action.error
    }
  }),

  on(customerActions.getCustomerSuccess, (state, action) => {
    return{
      ...state,
      selectedCustomer: action.customer
    }
  }),
  on(customerActions.getCustomerFailure, (state, action) => {
    return{
      ...state,
      error: action.error
    }
  }),

  on(customerActions.addCustomerSuccess, (state, action) =>
    customerAdapter.addOne(action.addedCustomer, state)
  ),
  on(customerActions.addCustomerFailure, (state, action) => {
    return{
      ...state,
      error: action.error
    }
  }),

  on(customerActions.updateCustomerSuccess, (state, action) =>
    customerAdapter.updateOne(action.updatedCustomer,state)
  ),
  on(customerActions.updateCustomerFailure, (state, action) => {
    return{
      ...state,
      error: action.error
    }
  }),

  on(customerActions.removeCustomer, (state, action) => {
    return{
      ...state,
      selectedCustomer: state.entities[action.id]
    }
  }),
  on(customerActions.removeCustomerSuccess, state =>
    customerAdapter.removeOne(state.selectedCustomer.id, {
      ...state,
      selectedCustomer: null
    })
  ),
  on(customerActions.removeCustomerFailure , (state, action) => {
    return{
      ...state,
      erroe: action.error
    }
  }),
)

export const { selectAll } = customerAdapter.getSelectors();


