import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/internal/operators';

import { ProductService } from 'src/app/modules/product/resources/services/product.service'
import * as productsActions from 'src/app/store/actions/products.actions';

@Injectable()
export class ProductEffects{

  getProduct$ = createEffect(() => this.actions$.pipe(
    ofType(productsActions.getProduct),
    switchMap(action => this.product.getProduct(
      action.id
    ).pipe(
      map(product => productsActions.getProductSuccess({product})),
      catchError(err => of(productsActions.getProductFailure(err)))
    )
  )))

  getProducts$ = createEffect(() => this.actions$.pipe(
    ofType(productsActions.getProducts),
    switchMap(action => this.product.getProducts()
    .pipe(
      map(products => productsActions.getProductsSuccess({products})),
      catchError(err => of(productsActions.getProductsFailure(err)))
    )
  )))

  getAvailableProducts$ = createEffect(() => this.actions$.pipe(
    ofType(productsActions.getAvailableProducts),
    switchMap(action => this.product.getAvailableProducts()
    .pipe(
      map(products => productsActions.getAvailableProductsSuccess({products})),
      catchError(err => of(productsActions.getAvailableProductsFailure(err)))
    )
  )))

  addProduct$ = createEffect(() => this.actions$.pipe(
    ofType(productsActions.addProduct),
    switchMap(action => this.product.addProduct(action.productToAdd)
    .pipe(
      map(addedProduct => productsActions.addProductSuccess({addedProduct})),
      catchError(err => of(productsActions.addProductFailure(err)))
    )
  )))

  updateProduct$ = createEffect(() => this.actions$.pipe(
    ofType(productsActions.updateProduct),
    switchMap(action => this.product.updateProduct(action.productToUpdate)
    .pipe(
      map(updatedProduct => productsActions.updateProductSuccess(
        {
          updatedProduct: {
          id: updatedProduct.id,
          changes: updatedProduct
          }
        }
      )),
      catchError(err => of(productsActions.updateProductFailure(err)))
    )
  )))

  removeProduct$ = createEffect(() => this.actions$.pipe(
    ofType(productsActions.removeProduct),
    switchMap(action => this.product.removeProduct(action.id)
    .pipe(
      map(() => productsActions.removeProductSuccess()),
      catchError(err => of(productsActions.removeProductFailure(err)))
    )
  )))

  addOrUpdateProductRedirect$ = createEffect(() => this.actions$.pipe(
    ofType(productsActions.addProductSuccess,
           productsActions.updateProductSuccess),
           tap(() => this.router.navigate(['/products']))
  ),{dispatch: false})

  constructor(private actions$: Actions, private product: ProductService, private router: Router){}
}
