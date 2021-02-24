import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { RouterModule, Routes } from '@angular/router';
import { OrderComponent } from './order/order.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { orderReducer, ORDER_REDUCER_NODE } from 'src/app/store/reducers/order.reducer';
import { EffectsModule } from '@ngrx/effects';
import { OrderEffects } from 'src/app/store/effects/order.effects';
import { ReactiveFormsModule } from '@angular/forms';
import { OrderViewComponent } from './order-view/order-view.component';
import { SharedModule } from '../shared/shared.module';
import { OrdersItemListComponent } from './order-item-list/order-item-listcomponent';
import { CreateOrderComponent } from './create-order/create-order.component';
import { UpdateOrderComponent } from './update-order/update-order.component';
import { AddProductToOrderComponent } from './add-product-to-order/add-product-to-ordercomponent';
import { OrderFormComponent } from './order-form/order-form.component';

const routes: Routes = [
  {
    path: 'orders',
    component: OrdersListComponent
  },
  {
    path: 'order/detail/:id',
    component : OrderViewComponent
  },

  {
    path:'order/create',
    component: CreateOrderComponent
  },
  {
    path: 'order/edit/:id',
    component: UpdateOrderComponent
  },
  {
    path: 'order/add-product',
    component: AddProductToOrderComponent
  }
];

@NgModule({
  declarations: [
    OrderViewComponent,
    OrdersListComponent,
    OrderComponent,
    AddProductToOrderComponent,
    OrdersItemListComponent,
    CreateOrderComponent,
    UpdateOrderComponent,
    OrderFormComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(ORDER_REDUCER_NODE, orderReducer),
    EffectsModule.forFeature([OrderEffects])
  ]
})
export class OrderModule { }
