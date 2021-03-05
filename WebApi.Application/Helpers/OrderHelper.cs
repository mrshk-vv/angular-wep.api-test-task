using System.Collections.Generic;
using System.Linq;
using Application.Models.Order;
using Core.Entities;
using Core.Repositories;

namespace Application.Helpers
{
    internal static class OrderHelper
    {
        internal static decimal GetOrderTotalCost(List<OrderItem> orderItems, List<Product> products)
        {
            decimal totalCost = 0;

            products = products.OrderBy(x => x.Id).ToList();
            orderItems = orderItems.OrderBy(x => x.ProductId).ToList();

            for (var i = 0; i < orderItems.Count; i++)
            {
                var currentProductInOrder = products.FirstOrDefault(x => x.Id == orderItems[i].ProductId);
                totalCost += orderItems[i].Count * currentProductInOrder.Price;

            }

            return totalCost;
        }

        internal static List<OrderItem> ReworkOrderItems(List<OrderItem> orderItems)
        {
            List<OrderItem> reworkedCollection = new List<OrderItem>();

            foreach (var orderItem in orderItems)
            {
                reworkedCollection.Add(new OrderItem
                {
                    Id = null,
                    ProductId = orderItem.ProductId,
                    ProductSize = orderItem.ProductSize
                });
            }

            return reworkedCollection;
        }
    }
}
