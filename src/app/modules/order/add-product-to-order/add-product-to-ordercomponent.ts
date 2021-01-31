import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Guid } from 'guid-typescript';
import { Subscription } from 'rxjs';
import { addProductToOrder } from 'src/app/store/actions/order.actions';
import { getAvailableProducts, getAvailableProductsFailure, getProducts } from 'src/app/store/actions/products.actions';
import { getOrderSelector } from 'src/app/store/selectors/order.selectors';
import { getAvailableProductsSelector, getProductsSelector } from 'src/app/store/selectors/product.selectors';
import { Size } from '../../product/resources/models/product-size.enum';
import { Product } from '../../product/resources/models/product.model';
import { OrderItem } from '../resources/models/order-item.model';
import { Order } from '../resources/models/order.model';
import { CartService } from '../resources/services/cart.service';

@Component({
  selector: 'app-add-product-to-order',
  templateUrl: './add-product-to-order.component.html',
  styleUrls: ['./add-product-to-order.component.scss']
})
export class AddProductToOrderComponent implements OnInit, OnDestroy {

  order: Order

  selectedProduct: Product
  products: Product[]

  products$: Subscription
  order$: Subscription

  sizes = Size
  keysSizes: string[]


  orderItemForm = new FormGroup({
    productId: new FormControl('', Validators.required),
    productSize: new FormControl('', Validators.required),
    count: new FormControl(1, [Validators.required, Validators.min(1)]),
  })

  constructor(private store: Store,
    private cartService: CartService,
    private router: Router) { }

  ngOnDestroy(): void {
    if (this.order$) {
      this.order$.unsubscribe()
    }
    this.products$.unsubscribe()
  }

  initOrderItemForm(): void {
    this.orderItemForm.setValue({
      productId: null,
      productSize: null,
      count: 1
    })
  }

  ngOnInit(): void {
    this.initOrderItemForm()
    this.store.dispatch(getAvailableProducts())
    this.products$ = this.store.select(getAvailableProductsSelector).subscribe(data => this.products = data)
    this.order$ = this.store.select(getOrderSelector).subscribe(data => this.order = data)
    this.keysSizes = Object.keys(this.sizes).filter(Number)
  }

  setProduct(event): void {
    let productId = event.target.value
    this.selectedProduct = this.products.find(p => p.id === productId)
  }

  submit(): void {
    let orderItem: OrderItem = this.orderItemForm.value
    orderItem = {...orderItem, product: this.selectedProduct}

    if (this.selectedProduct.quantity < orderItem.count) {
      alert('There is no such quantity of goods in stock')
      return
    }

    if (this.order) {
      orderItem.orderId = this.order.id
      this.order = {
        ...this.order,
        orderItems: [
        ...this.order.orderItems,
        orderItem
        ]
      }
      this.store.dispatch(addProductToOrder({orderWithNewItem: this.order}))

      this.router.navigate(['/order/edit', this.order.id])
    } else {
      let order = this.cartService.getOrder as Order
      orderItem.orderId = order.id
      this.cartService.addProduct(orderItem)

      this.router.navigate(['/order/create'])
    }
  }

  get product() {
    return this.orderItemForm.get('productId') as FormGroup
  }

  get count() {
    return this.orderItemForm.get('count') as FormGroup
  }

  get productSize() {
    return this.orderItemForm.get('productSize') as FormGroup
  }

}
