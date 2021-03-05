import { Size } from "src/app/modules/product/resources/models/product-size.enum";
import { Product } from "src/app/modules/product/resources/models/product.model";
import { Order } from "./order.model";

export interface OrderItem {
  id: string
  productId: string
  product: Product
  orderId?: string
  order?: Order
  productSize: Size
  count: number
  createdDate?: string
}
