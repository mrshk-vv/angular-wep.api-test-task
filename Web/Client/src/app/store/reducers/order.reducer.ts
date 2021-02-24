import { createReducer, on } from '@ngrx/store';

import { AppState } from '../states/app-state';

import * as orderActions from 'src/app/store/actions/order.actions'
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Order } from 'src/app/modules/Order/resources/models/Order.model';

export const ORDER_REDUCER_NODE = 'order'

export interface OrderState extends AppState, EntityState<Order> {
  selectedOrder: Order
  error: undefined
}

export const orderAdapter: EntityAdapter<Order> = createEntityAdapter<Order>()

export const initialOrderState = orderAdapter.getInitialState({
  selectedOrder: null,
  error: null
})

export const orderReducer = createReducer(
  initialOrderState,

  on(orderActions.getOrdersSuccess, (state, action) =>
    orderAdapter.setAll(action.orders, state)
  ),

  on(orderActions.removeSelectedOrder, state => {
    return{
      ...state,
      selectedOrder: null
    }
  }),

  on(orderActions.addProductToOrder, (state, action) =>{
    return{
      ...state,
      selectedOrder: action.orderWithNewItem
    }
  }),

  on(orderActions.getOrdersFailure, (state, action) => {
    return{
      ...state,
      error: action.error
    }
  }),

  on(orderActions.getOrderSuccess, (state, action) => {
    return{
      ...state,
      selectedOrder: action.order
    }
  }),
  on(orderActions.getOrderFailure, (state, action) => {
    return{
      ...state,
      error: action.error
    }
  }),

  on(orderActions.addOrderSuccess, (state, action) =>
    orderAdapter.addOne(action.addedOrder, state)
  ),
  on(orderActions.addOrderFailure, (state, action) => {
    return{
      ...state,
      error: action.error
    }
  }),

  on(orderActions.updateOrderSuccess, (state, action) =>
    orderAdapter.updateOne(action.updatedOrder,state)
  ),
  on(orderActions.updateOrderFailure, (state, action) => {
    return{
      ...state,
      error: action.error
    }
  }),

  on(orderActions.removeOrder, (state, action) => {
    return{
      ...state,
      selectedOrder: state.entities[action.id]
    }
  }),
  on(orderActions.removeOrderSuccess, state =>
    orderAdapter.removeOne(state.selectedOrder.id, {
      ...state,
      selectedOrder: null
    })
  ),
  on(orderActions.removeOrderFailure , (state, action) => {
    return{
      ...state,
      erroe: action.error
    }
  }),
)

export const { selectAll } = orderAdapter.getSelectors();


