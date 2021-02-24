import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CUSTOMER_REDUCER_NODE, selectAll } from "../reducers/customer.reducer";
const getCustomerFeature = createFeatureSelector(CUSTOMER_REDUCER_NODE);
export const getCustomersSelector = createSelector(getCustomerFeature, selectAll);
export const getCustomerSelector = createSelector(getCustomerFeature, state => state.selectedCustomer);
//# sourceMappingURL=customer.selectors.js.map