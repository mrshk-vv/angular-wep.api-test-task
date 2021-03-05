import { createFeatureSelector, createSelector } from "@ngrx/store"
import { CustomerState, CUSTOMER_REDUCER_NODE, selectAll } from "../reducers/customer.reducer"

const getCustomerFeature = createFeatureSelector<CustomerState>(CUSTOMER_REDUCER_NODE)

export const getCustomersSelector = createSelector(
  getCustomerFeature,
  selectAll
)

export const getCustomerSelector = createSelector(
  getCustomerFeature,
  state => state.selectedCustomer
)
