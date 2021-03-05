import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { getProduct } from 'src/app/store/actions/products.actions';
import { ProductState } from 'src/app/store/reducers/product.reducer';
import { getProductSelector } from 'src/app/store/selectors/product.selectors';
import { Product } from '../resources/models/product.model';
import { ProductService } from '../resources/services/product.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit, OnDestroy {

  productId: string
  product: Product

  product$ = this.store.select(getProductSelector).subscribe(
    data => this.product = data
  )

  constructor(private activatedRoute: ActivatedRoute,
              private store: Store<ProductState>,
              private router: Router) {
                activatedRoute.params.subscribe(params => this.productId = params['id']).unsubscribe();
              }
  ngOnDestroy(): void {
    this.product$.unsubscribe()
  }

  ngOnInit(): void {
    this.store.dispatch(getProduct({id: this.productId}))
  }

  editProduct(){
    this.router.navigate(['/product/edit', this.product.id])
  }

}
