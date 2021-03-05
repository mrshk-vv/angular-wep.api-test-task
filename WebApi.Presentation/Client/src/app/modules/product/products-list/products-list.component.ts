import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { getProducts, removeProduct } from 'src/app/store/actions/products.actions';
import { ProductState } from 'src/app/store/reducers/product.reducer';
import { getProductsSelector } from 'src/app/store/selectors/product.selectors';
import { Product } from '../resources/models/product.model';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit, OnDestroy {

  products: Product[]
  products$ : Subscription

  constructor(private store: Store<ProductState>,
              private router: Router) { }

  ngOnDestroy(): void {
    this.products$.unsubscribe()
  }

  ngOnInit(): void {
    this.store.dispatch(getProducts())
    this.products$ = this.store.select(getProductsSelector).subscribe(data => this.products = data)
  }

  editProduct(product: Product){
    this.router.navigate(['/product/edit', product.id])
  }

  deleteProduct(product: Product){
    let result = confirm('Are you sure want to delete this item');
    if(result){
      this.store.dispatch(removeProduct({id: product.id}))
    }
  }

  viewProduct(product: Product){
    this.router.navigate(['/product/detail', product.id])
  }

}
