import { Update } from "@ngrx/entity"
import { createAction, props } from "@ngrx/store"
import { OrderItem } from "src/app/modules/order/resources/models/order-item.model";
import { Order } from "src/app/modules/order/resources/models/order.model";

export enum OrdersActions{
  GET_ORDER = '[Order] Get Order',
  GET_ORDER_SUCCESS = '[Order] Get Order Success',
  GET_ORDER_FAILURE = '[Order] Get Order Failure',

  GET_ORDERS = '[Order] Get Orders',
  GET_ORDERS_SUCCESS = '[Order] Get Orders Success',
  GET_ORDERS_FAILURE = '[Order] Get Orders Failure',

  ADD_ORDER = '[Order] Add Order',
  ADD_ORDER_SUCCESS = '[Order] Add Order Success',
  ADD_ORDER_FAILURE = '[Order] Add Order Failure',

  REMOVE_ORDER = '[Order] Remove Order',
  REMOVE_ORDER_SUCCESS = '[Order] Remove Order Success',
  REMOVE_ORDER_FAILURE = '[Order] Remove Order Failure',

  ADD_PRODUCT_TO_ORDER = '[Order] Add Product To Order',

  REMOVE_SELECTED_ORDER = '[Order] Remove selected Order',

  UPDATE_ORDER = '[Order] Update Order',
  UPDATE_ORDER_SUCCESS = '[Order] Update Order Success',
  UPDATE_ORDER_FAILURE = '[Order] Update Order Failure',
}

export const removeSelectedOrder = createAction(
  OrdersActions.REMOVE_SELECTED_ORDER
)

export const addProductToOrder = createAction(
  OrdersActions.ADD_PRODUCT_TO_ORDER,
  props<{orderWithNewItem: Order}>()
)


export const getOrder = createAction(
  OrdersActions.GET_ORDER,
  props<{id: string}>()
)


export const getOrderSuccess = createAction(
  OrdersActions.GET_ORDER_SUCCESS,
  props<{order: Order}>()
)

export const getOrderFailure = createAction(
  OrdersActions.GET_ORDER_FAILURE,
  props<{error: any}>()
)

export const getOrders = createAction(
  OrdersActions.GET_ORDERS
)

export const getOrdersSuccess = createAction(
  OrdersActions.GET_ORDERS_SUCCESS,
  props<{orders: Order[]}>(),
)

export const getOrdersFailure = createAction(
  OrdersActions.GET_ORDERS_FAILURE,
  props<{error: any}>()
)

export const addOrder = createAction(
  OrdersActions.ADD_ORDER,
  props<{orderToAdd: Order}>()
)

export const addOrderSuccess = createAction(
  OrdersActions.ADD_ORDER_SUCCESS,
  props<{addedOrder: Order}>()
)

export const addOrderFailure = createAction(
  OrdersActions.ADD_ORDER_FAILURE,
  props<{error: any}>()
)

export const updateOrder = createAction(
  OrdersActions.UPDATE_ORDER,
  props<{orderToUpdate: Order}>()
)

export const updateOrderSuccess = createAction(
  OrdersActions.UPDATE_ORDER_SUCCESS,
  props<{updatedOrder: Update<Order>}>()
)

export const updateOrderFailure = createAction(
  OrdersActions.UPDATE_ORDER_FAILURE,
  props<{error: any}>()
)

export const removeOrder = createAction(
  OrdersActions.REMOVE_ORDER,
  props<{id: string}>()
)

export const removeOrderSuccess = createAction(
  OrdersActions.REMOVE_ORDER_SUCCESS
)

export const removeOrderFailure = createAction(
  OrdersActions.REMOVE_ORDER_FAILURE,
  props<{error: any}>()
)
