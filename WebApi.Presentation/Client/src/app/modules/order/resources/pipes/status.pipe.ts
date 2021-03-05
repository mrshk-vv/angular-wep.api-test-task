import { Pipe, PipeTransform } from '@angular/core';
import { Status } from '../models/status.enum';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    switch (value) {
      case Status.None:
        return 'None'
      case Status.New:
        return 'New'
      case Status.Paid:
        return 'Paid'
      case Status.Shipped:
        return 'Shipped'
      case Status.Delivered:
        return 'Delivered'
      case Status.Closed:
        return 'Closed'
    }
  }

}
