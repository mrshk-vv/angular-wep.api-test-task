import { createReducer, on } from '@ngrx/store';

import { AppState } from '../states/app-state';

import * as productActions from 'src/app/store/actions/products.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Product } from 'src/app/modules/product/resources/models/product.model';

export const PRODUCT_REDUCER_NODE = 'product'

export interface ProductState extends AppState, EntityState<Product> {
  availableProducts: Product[]
  selectedProduct: Product
  error: undefined
}

export const productAdapter: EntityAdapter<Product> = createEntityAdapter<Product>()

export const initialProductState = productAdapter.getInitialState({
  selectedProduct: null,
  error: null
})

export const productReducer = createReducer(
  initialProductState,

  on(productActions.getProductsSuccess, (state, action) =>
    productAdapter.setAll(action.products, state)
  ),
  on(productActions.getProductsFailure, (state, action) => {
    return{
      ...state,
      error: action.error
    }
  }),

  on(productActions.getProductSuccess, (state, action) => {
    return{
      ...state,
      selectedProduct: action.product
    }
  }),
  on(productActions.getProductFailure, (state, action) => {
    return{
      ...state,
      error: action.error
    }
  }),

  on(productActions.getAvailableProductsSuccess, (state, action) => {
    return{
      ...state,
      availableProducts: action.products
    }
  }),
  on(productActions.getAvailableProductsFailure, (state, action) => {
    return{
      ...state,
      error: action.error
    }
  }),

  on(productActions.addProductSuccess, (state, action) =>
    productAdapter.addOne(action.addedProduct, state)
  ),
  on(productActions.addProductFailure, (state, action) => {
    return{
      ...state,
      error: action.error
    }
  }),

  on(productActions.updateProductSuccess, (state, action) =>
    productAdapter.updateOne(action.updatedProduct,state)
  ),
  on(productActions.updateProductFailure, (state, action) => {
    return{
      ...state,
      error: action.error
    }
  }),

  on(productActions.removeProduct, (state, action) => {
    return{
      ...state,
      selectedProduct: state.entities[action.id]
    }
  }),
  on(productActions.removeProductSuccess, state =>
    productAdapter.removeOne(state.selectedProduct.id, {
      ...state,
      selectedProduct: null
    })
  ),
  on(productActions.removeProductFailure , (state, action) => {
    return{
      ...state,
      erroe: action.error
    }
  }),
)

export const { selectAll } = productAdapter.getSelectors();


