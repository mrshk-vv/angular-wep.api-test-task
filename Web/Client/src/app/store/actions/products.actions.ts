import { Update } from "@ngrx/entity"
import { createAction, props } from "@ngrx/store"
import { Product } from "src/app/modules/product/resources/models/product.model"

export enum ProductsActions{
  GET_PRODUCT = '[Product] Get Product',
  GET_PRODUCT_SUCCESS = '[Product] Get Product Success',
  GET_PRODUCT_FAILURE = '[Product] Get Product Failure',

  GET_PRODUCTS = '[Product] Get Products',
  GET_PRODUCTS_SUCCESS = '[Product] Get Products Success',
  GET_PRODUCTS_FAILURE = '[Product] Get Products Failure',

  GET_AVAILABLE_PRODUCTS = '[Product] Get Available Products',
  GET_AVAILABLE_PRODUCTS_SUCCESS = '[Product] Get Available Products Success',
  GET_AVAILABLE_PRODUCTS_FAILURE = '[Product] Get Available Products Failure',

  ADD_PRODUCT = '[Product] Add Product',
  ADD_PRODUCT_SUCCESS = '[Product] Add Product Success',
  ADD_PRODUCT_FAILURE = '[Product] Add Product Failure',

  REMOVE_PRODUCT = '[Product] Remove Product',
  REMOVE_PRODUCT_SUCCESS = '[Product] Remove Product Success',
  REMOVE_PRODUCT_FAILURE = '[Product] Remove Product Failure',

  UPDATE_PRODUCT = '[Product] Update Product',
  UPDATE_PRODUCT_SUCCESS = '[Product] Update Product Success',
  UPDATE_PRODUCT_FAILURE = '[Product] Update Product Failure',
}

export const getProduct = createAction(
  ProductsActions.GET_PRODUCT,
  props<{id: string}>()
)

export const getProductSuccess = createAction(
  ProductsActions.GET_PRODUCT_SUCCESS,
  props<{product: Product}>()
)

export const getProductFailure = createAction(
  ProductsActions.GET_PRODUCT_FAILURE,
  props<{error: any}>()
)

export const getProducts = createAction(
  ProductsActions.GET_PRODUCTS
)

export const getProductsSuccess = createAction(
  ProductsActions.GET_PRODUCTS_SUCCESS,
  props<{products: Product[]}>(),
)

export const getProductsFailure = createAction(
  ProductsActions.GET_PRODUCTS_FAILURE,
  props<{error: any}>()
)

export const getAvailableProducts = createAction(
  ProductsActions.GET_AVAILABLE_PRODUCTS
)

export const getAvailableProductsSuccess = createAction(
  ProductsActions.GET_AVAILABLE_PRODUCTS_SUCCESS,
  props<{products: Product[]}>(),
)

export const getAvailableProductsFailure = createAction(
  ProductsActions.GET_AVAILABLE_PRODUCTS_FAILURE,
  props<{error: any}>()
)

export const addProduct = createAction(
  ProductsActions.ADD_PRODUCT,
  props<{productToAdd: Product}>()
)

export const addProductSuccess = createAction(
  ProductsActions.ADD_PRODUCT_SUCCESS,
  props<{addedProduct: Product}>()
)

export const addProductFailure = createAction(
  ProductsActions.ADD_PRODUCT_FAILURE,
  props<{error: any}>()
)

export const updateProduct = createAction(
  ProductsActions.UPDATE_PRODUCT,
  props<{productToUpdate: Product}>()
)

export const updateProductSuccess = createAction(
  ProductsActions.UPDATE_PRODUCT_SUCCESS,
  props<{updatedProduct: Update<Product>}>()
)

export const updateProductFailure = createAction(
  ProductsActions.UPDATE_PRODUCT_FAILURE,
  props<{error: any}>()
)

export const removeProduct = createAction(
  ProductsActions.REMOVE_PRODUCT,
  props<{id: string}>()
)

export const removeProductSuccess = createAction(
  ProductsActions.REMOVE_PRODUCT_SUCCESS
)

export const removeProductFailure = createAction(
  ProductsActions.REMOVE_PRODUCT_FAILURE,
  props<{error: any}>()
)
