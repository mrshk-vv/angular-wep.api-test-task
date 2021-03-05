import { Order } from "src/app/modules/order/resources/models/order.model";

export interface Customer{
  id: string
  name: string
  address: string
  createdDate: Date
  orders: Order[]
}
