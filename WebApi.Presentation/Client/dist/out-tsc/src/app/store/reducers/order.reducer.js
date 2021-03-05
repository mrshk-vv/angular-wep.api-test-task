import { createReducer, on } from '@ngrx/store';
import * as orderActions from 'src/app/store/actions/order.actions';
import { createEntityAdapter } from '@ngrx/entity';
export const ORDER_REDUCER_NODE = 'order';
export const orderAdapter = createEntityAdapter();
export const initialOrderState = orderAdapter.getInitialState({
    selectedOrder: null,
    error: null
});
export const orderReducer = createReducer(initialOrderState, on(orderActions.getOrdersSuccess, (state, action) => orderAdapter.setAll(action.orders, state)), on(orderActions.removeSelectedOrder, state => {
    return Object.assign(Object.assign({}, state), { selectedOrder: null });
}), on(orderActions.addProductToOrder, (state, action) => {
    return Object.assign(Object.assign({}, state), { selectedOrder: action.orderWithNewItem });
}), on(orderActions.getOrdersFailure, (state, action) => {
    return Object.assign(Object.assign({}, state), { error: action.error });
}), on(orderActions.getOrderSuccess, (state, action) => {
    return Object.assign(Object.assign({}, state), { selectedOrder: action.order });
}), on(orderActions.getOrderFailure, (state, action) => {
    return Object.assign(Object.assign({}, state), { error: action.error });
}), on(orderActions.addOrderSuccess, (state, action) => orderAdapter.addOne(action.addedOrder, state)), on(orderActions.addOrderFailure, (state, action) => {
    return Object.assign(Object.assign({}, state), { error: action.error });
}), on(orderActions.updateOrderSuccess, (state, action) => orderAdapter.updateOne(action.updatedOrder, state)), on(orderActions.updateOrderFailure, (state, action) => {
    return Object.assign(Object.assign({}, state), { error: action.error });
}), on(orderActions.removeOrder, (state, action) => {
    return Object.assign(Object.assign({}, state), { selectedOrder: state.entities[action.id] });
}), on(orderActions.removeOrderSuccess, state => orderAdapter.removeOne(state.selectedOrder.id, Object.assign(Object.assign({}, state), { selectedOrder: null }))), on(orderActions.removeOrderFailure, (state, action) => {
    return Object.assign(Object.assign({}, state), { erroe: action.error });
}));
export const { selectAll } = orderAdapter.getSelectors();
//# sourceMappingURL=order.reducer.js.map