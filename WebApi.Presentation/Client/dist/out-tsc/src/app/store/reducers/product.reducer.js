import { createReducer, on } from '@ngrx/store';
import * as productActions from 'src/app/store/actions/products.actions';
import { createEntityAdapter } from '@ngrx/entity';
export const PRODUCT_REDUCER_NODE = 'product';
export const productAdapter = createEntityAdapter();
export const initialProductState = productAdapter.getInitialState({
    selectedProduct: null,
    error: null
});
export const productReducer = createReducer(initialProductState, on(productActions.getProductsSuccess, (state, action) => productAdapter.setAll(action.products, state)), on(productActions.getProductsFailure, (state, action) => {
    return Object.assign(Object.assign({}, state), { error: action.error });
}), on(productActions.getProductSuccess, (state, action) => {
    return Object.assign(Object.assign({}, state), { selectedProduct: action.product });
}), on(productActions.getProductFailure, (state, action) => {
    return Object.assign(Object.assign({}, state), { error: action.error });
}), on(productActions.getAvailableProductsSuccess, (state, action) => {
    return Object.assign(Object.assign({}, state), { availableProducts: action.products });
}), on(productActions.getAvailableProductsFailure, (state, action) => {
    return Object.assign(Object.assign({}, state), { error: action.error });
}), on(productActions.addProductSuccess, (state, action) => productAdapter.addOne(action.addedProduct, state)), on(productActions.addProductFailure, (state, action) => {
    return Object.assign(Object.assign({}, state), { error: action.error });
}), on(productActions.updateProductSuccess, (state, action) => productAdapter.updateOne(action.updatedProduct, state)), on(productActions.updateProductFailure, (state, action) => {
    return Object.assign(Object.assign({}, state), { error: action.error });
}), on(productActions.removeProduct, (state, action) => {
    return Object.assign(Object.assign({}, state), { selectedProduct: state.entities[action.id] });
}), on(productActions.removeProductSuccess, state => productAdapter.removeOne(state.selectedProduct.id, Object.assign(Object.assign({}, state), { selectedProduct: null }))), on(productActions.removeProductFailure, (state, action) => {
    return Object.assign(Object.assign({}, state), { erroe: action.error });
}));
export const { selectAll } = productAdapter.getSelectors();
//# sourceMappingURL=product.reducer.js.map