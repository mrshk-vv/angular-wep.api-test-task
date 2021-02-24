import { Pipe, PipeTransform } from '@angular/core';
import { Size } from '../models/product-size.enum';

@Pipe({
  name: 'size'
})
export class SizePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    switch (value) {
      case Size.None:
        return 'None'
      case Size.Small:
        return 'Small'
      case Size.Medium:
        return 'Medium'
      case Size.Large:
        return 'Large'
    }
  }

}
