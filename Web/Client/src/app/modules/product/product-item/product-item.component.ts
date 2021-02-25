import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { addProduct, getProduct, updateProduct } from 'src/app/store/actions/products.actions';
import { ProductState } from 'src/app/store/reducers/product.reducer';
import { getProductSelector } from 'src/app/store/selectors/product.selectors';
import { Category } from '../resources/models/product-category.enum';
import { Product } from '../resources/models/product.model';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit, OnDestroy {

  keysCategories: string[]
  categories = Category

  productForm: FormGroup = new FormGroup({
      id: new FormControl(),
      createdDate: new FormControl(),
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      category: new FormControl('', [Validators.required]),
      price: new FormControl(1, [Validators.required, Validators.min(1)]),
      quantity: new FormControl(1, [Validators.required, Validators.min(1)]),
      description: new FormControl('')
  })

  productId: string
  product: Product
  product$ : Subscription

  constructor(private activatedRoute: ActivatedRoute,
              private store: Store<ProductState>,
              private router: Router) {
    activatedRoute.params.subscribe(params => this.productId = params['id']).unsubscribe()
  }

  ngOnDestroy(): void {
    if(this.product$){
      this.product$.unsubscribe()
    }
  }

  ngOnInit(): void {
    if(this.productId){
      this.product$ = this.store.select(getProductSelector).subscribe(data => this.product = data)
      this.store.dispatch(getProduct({id: this.productId}))
      this.store.select(getProductSelector).subscribe(data => this.product = data)
    }
    if(this.product === null){
      this.router.navigate(['/product/detail', this.productId])
    }
    this.keysCategories = Object.keys(this.categories).filter(Number)

    this.product ? this.populateProductForm() : this.initProductForm()
  }

  populateProductForm() {
    this.productForm.patchValue({
      id: this.productId,
      createdDate: this.product.createdDate,
      name: this.product.name,
      category: this.product.category,
      price: this.product.price,
      quantity: this.product.quantity,
      description: this.product.description
    })
  }

  initProductForm() {
    this.productForm.setValue({
      name: '',
      category: null,
      price: 1,
      quantity: 1,
      description: ''
    })
  }

  get name(){
    return this.productForm.get('name') as FormGroup
  }

  get category(){
    return this.productForm.get('category') as FormGroup
  }
  get price(){
    return this.productForm.get('price') as FormGroup
  }

  get quantity(){
    return this.productForm.get('quantity') as FormGroup
  }

  cancel(){
    this.router.navigate(['/products'])
  }

  submit(){
    this.product = this.productForm.value
    if(this.productId){
      this.store.dispatch(updateProduct({productToUpdate: this.product}))
    }else{
      this.store.dispatch(addProduct({productToAdd: this.product}))
    }
  }

}
