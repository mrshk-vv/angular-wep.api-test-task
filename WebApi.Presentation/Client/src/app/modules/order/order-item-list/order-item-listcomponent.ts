import { Component, Input, OnInit } from '@angular/core';
import { OrderItem } from '../resources/models/order-item.model';

@Component({
  selector: 'app-order-item-list',
  templateUrl: './order-item-list.component.html',
  styleUrls: ['./order-item-list.component.scss']
})
export class OrdersItemListComponent implements OnInit {
  @Input() orderItems: OrderItem[]
  constructor() { }

  ngOnInit(): void {
  }

}
