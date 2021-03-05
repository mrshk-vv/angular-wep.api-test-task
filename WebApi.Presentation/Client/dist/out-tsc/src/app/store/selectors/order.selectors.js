import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ORDER_REDUCER_NODE, selectAll } from "../reducers/order.reducer";
const getOrderFeature = createFeatureSelector(ORDER_REDUCER_NODE);
export const getOrdersSelector = createSelector(getOrderFeature, selectAll);
export const getOrderSelector = createSelector(getOrderFeature, state => state.selectedOrder);
//# sourceMappingURL=order.selectors.js.map