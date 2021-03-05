import { createFeatureSelector, createSelector } from "@ngrx/store"
import { OrderState, ORDER_REDUCER_NODE, selectAll } from "../reducers/order.reducer"

const getOrderFeature = createFeatureSelector<OrderState>(ORDER_REDUCER_NODE)

export const getOrdersSelector = createSelector(
  getOrderFeature,
  selectAll
)

export const getOrderSelector = createSelector(
  getOrderFeature,
  state => state.selectedOrder
)
