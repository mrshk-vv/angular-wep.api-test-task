import { createFeatureSelector, createSelector } from "@ngrx/store"
import { ProductState, PRODUCT_REDUCER_NODE, selectAll } from "../reducers/product.reducer"

const getProductFeature = createFeatureSelector<ProductState>(PRODUCT_REDUCER_NODE)

export const getProductsSelector = createSelector(
  getProductFeature,
  selectAll
)

export const getProductSelector = createSelector(
  getProductFeature,
  state => state.selectedProduct
)

export const getAvailableProductsSelector = createSelector(
  getProductFeature,
  state => state.availableProducts
)
