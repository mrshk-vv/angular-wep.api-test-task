import { Pipe, PipeTransform } from '@angular/core';
import { Category } from '../models/product-category.enum';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    switch (value) {
      case Category.None:
        return 'None'
      case Category.Foods:
        return 'Foods'
      case Category.Drinks:
        return 'Drinks'
      case Category.Dessert:
        return 'Desserts'
      case Category.Vegetables:
        return 'Vegatables'
    }
  }

}
