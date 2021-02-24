import { Customer } from "src/app/modules/customer/resources/models/customer.model"
import { OrderItem } from "./order-item.model";
import { Status } from "./status.enum";

export interface Order{
  id: string
  customerId: string
  customer: Customer
  status: Status
  totalCost: number
  comment: string
  orderItems: OrderItem[]
  createdDate: string
}
