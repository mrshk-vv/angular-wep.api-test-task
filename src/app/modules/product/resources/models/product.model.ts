import { Category } from "./product-category.enum";

export interface Product {
  id?: string
  name?: string
  category?: Category
  quantity?: number
  price?: number
  createdDate?: Date,
  description?: string
}
