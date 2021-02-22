import { JsonpClientBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OrderItem } from '../models/order-item.model';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart = 'cart'
  order = 'order'

  orderItems: OrderItem[] = []
  cartItems = new BehaviorSubject(this.getCart)

  constructor() {}

  createCart(): void{
    localStorage.setItem(this.cart, null)
  }

  createOrder(): void {
    this.clearOrder()
    localStorage.setItem(this.order,JSON.stringify({ id: null}))
  }

  clearOrder(): void{
    localStorage.clear()
  }

  set setCart(orderItems: OrderItem[]){
    this.cartItems.next(orderItems)
    localStorage.setItem(this.cart,JSON.stringify(orderItems))
  }

  get getCart(){
    return JSON.parse(localStorage.getItem(this.cart)) as OrderItem[]
  }

  set setOrder(order: Order){
    localStorage.setItem(this.order, JSON.stringify(order))
  }

  get getOrder(){
    return JSON.parse(localStorage.getItem(this.order))
  }


  addProduct(orderItem: OrderItem): void{
    let cart = this.getCart
    if(cart === null){
      this.createCart()
      this.orderItems.push(orderItem)
      this.setCart = this.orderItems
    }else{
      this.orderItems = this.getCart

      const existingProductIndex = this.orderItems.findIndex(i => i.productId === orderItem.productId &&
                                                                  i.productSize === orderItem.productSize)

      if(existingProductIndex != null && existingProductIndex != -1){
        this.orderItems[existingProductIndex].count += orderItem.count
      }else{
        this.orderItems.push(orderItem)
      }
      this.setCart = this.orderItems
      this.orderItems = []
    }
  }

  deleteProductInCart(orderItem: OrderItem): void{
    this.orderItems = this.getCart
    let orderItemIndex = this.orderItems.findIndex(i => i.productId = orderItem.productId)
    if(orderItemIndex != -1){
      this.orderItems.splice(orderItemIndex, 1)
    }
    this.setCart = this.orderItems
  }
}
