import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { ProductComponent } from './product/product.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { productReducer, PRODUCT_REDUCER_NODE } from 'src/app/store/reducers/product.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from 'src/app/store/effects/products.effects';
import { ProductViewComponent } from './product-view/product-view.component';
import { CategoryPipe } from './resources/pipes/category.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SizePipe } from './resources/pipes/size.pipe';
import { SharedModule } from '../shared/shared.module';


const routes: Routes = [
  {
    path: 'products',
    component: ProductsListComponent
  },
  {
    path: 'product/detail/:id',
    component: ProductViewComponent
  },
  {
    path: 'product/create',
    component: ProductItemComponent
  },
  {
    path: 'product/edit/:id',
    component: ProductItemComponent
  }
];

@NgModule({
  declarations: [
    ProductsListComponent,
    ProductItemComponent,
    ProductComponent,
    ProductViewComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedModule,
    StoreModule.forFeature(PRODUCT_REDUCER_NODE, productReducer),
    EffectsModule.forFeature([ProductEffects])
  ]
})
export class ProductModule { }
