using System.Collections.Generic;
using Application.Models.Product;

namespace Application.Models.Order
{
    public class CreateOrderModel: OrderModel
    {
        public List<ProductModel> Products;
    }
}
