import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusPipe } from '../order/resources/pipes/status.pipe';
import { CategoryPipe } from '../product/resources/pipes/category.pipe';
import { SizePipe } from '../product/resources/pipes/size.pipe';



@NgModule({
  declarations: [
    StatusPipe,
    SizePipe,
    CategoryPipe
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    StatusPipe,
    SizePipe,
    CategoryPipe
  ]
})
export class SharedModule { }
