import { createReducer, on } from '@ngrx/store';
import * as customerActions from 'src/app/store/actions/customer.actions';
import { createEntityAdapter } from '@ngrx/entity';
export const CUSTOMER_REDUCER_NODE = 'customer';
export const customerAdapter = createEntityAdapter();
export const initialCustomerState = customerAdapter.getInitialState({
    selectedCustomer: null,
    error: null
});
export const customerReducer = createReducer(initialCustomerState, on(customerActions.getCustomersSuccess, (state, action) => customerAdapter.setAll(action.customers, state)), on(customerActions.getCustomersFailure, (state, action) => {
    return Object.assign(Object.assign({}, state), { error: action.error });
}), on(customerActions.getCustomerSuccess, (state, action) => {
    return Object.assign(Object.assign({}, state), { selectedCustomer: action.customer });
}), on(customerActions.getCustomerFailure, (state, action) => {
    return Object.assign(Object.assign({}, state), { error: action.error });
}), on(customerActions.addCustomerSuccess, (state, action) => customerAdapter.addOne(action.addedCustomer, state)), on(customerActions.addCustomerFailure, (state, action) => {
    return Object.assign(Object.assign({}, state), { error: action.error });
}), on(customerActions.updateCustomerSuccess, (state, action) => customerAdapter.updateOne(action.updatedCustomer, state)), on(customerActions.updateCustomerFailure, (state, action) => {
    return Object.assign(Object.assign({}, state), { error: action.error });
}), on(customerActions.removeCustomer, (state, action) => {
    return Object.assign(Object.assign({}, state), { selectedCustomer: state.entities[action.id] });
}), on(customerActions.removeCustomerSuccess, state => customerAdapter.removeOne(state.selectedCustomer.id, Object.assign(Object.assign({}, state), { selectedCustomer: null }))), on(customerActions.removeCustomerFailure, (state, action) => {
    return Object.assign(Object.assign({}, state), { erroe: action.error });
}));
export const { selectAll } = customerAdapter.getSelectors();
//# sourceMappingURL=customer.reducer.js.map