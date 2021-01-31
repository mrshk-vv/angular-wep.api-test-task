using System.Collections.Generic;
using System.Linq;
using Application.Models.Order;
using Core.Entities;

namespace Application.Helpers
{
    internal static class ProductHelper
    {
        internal static List<Product> SetNewProductQuantities(List<Product> products, List<OrderItemModel> orderItems)
        {
            for (int i = 0; i < products.Count; i++)
            {
                var orderItem = orderItems.FirstOrDefault(x => x.ProductId == products[i].Id);
                products[i].Quantity -= orderItem.Count;
            }

            return products;
        }
    }
}
