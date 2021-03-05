import { Update } from "@ngrx/entity"
import { createAction, props } from "@ngrx/store"
import { Customer } from "src/app/modules/customer/resources/models/customer.model"

export enum CustomersActions{
  GET_CUSTOMER = '[Customer] Get Customer',
  GET_CUSTOMER_SUCCESS = '[Customer] Get Customer Success',
  GET_CUSTOMER_FAILURE = '[Customer] Get Customer Failure',

  GET_CUSTOMERS = '[Customer] Get Customers',
  GET_CUSTOMERS_SUCCESS = '[Customer] Get Customers Success',
  GET_CUSTOMERS_FAILURE = '[Customer] Get Customers Failure',

  ADD_CUSTOMER = '[Customer] Add Customer',
  ADD_CUSTOMER_SUCCESS = '[Customer] Add Customer Success',
  ADD_CUSTOMER_FAILURE = '[Customer] Add Customer Failure',

  REMOVE_CUSTOMER = '[Customer] Remove Customer',
  REMOVE_CUSTOMER_SUCCESS = '[Customer] Remove Customer Success',
  REMOVE_CUSTOMER_FAILURE = '[Customer] Remove Customer Failure',

  UPDATE_CUSTOMER = '[Customer] Update Customer',
  UPDATE_CUSTOMER_SUCCESS = '[Customer] Update Customer Success',
  UPDATE_CUSTOMER_FAILURE = '[Customer] Update Customer Failure',
}

export const getCustomer = createAction(
  CustomersActions.GET_CUSTOMER,
  props<{id: string}>()
)

export const getCustomerSuccess = createAction(
  CustomersActions.GET_CUSTOMER_SUCCESS,
  props<{customer: Customer}>()
)

export const getCustomerFailure = createAction(
  CustomersActions.GET_CUSTOMER_FAILURE,
  props<{error: any}>()
)

export const getCustomers = createAction(
  CustomersActions.GET_CUSTOMERS
)

export const getCustomersSuccess = createAction(
  CustomersActions.GET_CUSTOMERS_SUCCESS,
  props<{customers: Customer[]}>(),
)

export const getCustomersFailure = createAction(
  CustomersActions.GET_CUSTOMERS_FAILURE,
  props<{error: any}>()
)

export const addCustomer = createAction(
  CustomersActions.ADD_CUSTOMER,
  props<{customerToAdd: Customer}>()
)

export const addCustomerSuccess = createAction(
  CustomersActions.ADD_CUSTOMER_SUCCESS,
  props<{addedCustomer: Customer}>()
)

export const addCustomerFailure = createAction(
  CustomersActions.ADD_CUSTOMER_FAILURE,
  props<{error: any}>()
)

export const updateCustomer = createAction(
  CustomersActions.UPDATE_CUSTOMER,
  props<{customerToUpdate: Customer}>()
)

export const updateCustomerSuccess = createAction(
  CustomersActions.UPDATE_CUSTOMER_SUCCESS,
  props<{updatedCustomer: Update<Customer>}>()
)

export const updateCustomerFailure = createAction(
  CustomersActions.UPDATE_CUSTOMER_FAILURE,
  props<{error: any}>()
)

export const removeCustomer = createAction(
  CustomersActions.REMOVE_CUSTOMER,
  props<{id: string}>()
)

export const removeCustomerSuccess = createAction(
  CustomersActions.REMOVE_CUSTOMER_SUCCESS
)

export const removeCustomerFailure = createAction(
  CustomersActions.REMOVE_CUSTOMER_FAILURE,
  props<{error: any}>()
)
