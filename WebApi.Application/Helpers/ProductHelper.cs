using System;
using System.Collections.Generic;
using System.Linq;
using Application.Models.Order;
using Core.Entities;

namespace Application.Helpers
{
    internal static class ProductHelper
    {
        internal static List<Product> SetNewProductQuantities(List<Product> products, List<OrderItem> orderItems)
        {
            for (int i = 0; i < products.Count; i++)
            {
                var orderItem = orderItems.FirstOrDefault(x => x.ProductId == products[i].Id);
                products[i].Quantity -= orderItem.Count;
            }

            return products;
        }

        internal static List<Product> SetNewProductQuantities(List<Product> products, List<OrderItem> oldOrderItems,
            List<OrderItem> newOrderItems)
        {
            var newOrderItemsExcepted = newOrderItems.Except(oldOrderItems).ToList();
            int currentProductIndex;
            // oldOrderItems = oldOrderItems.OrderBy(x => x.ProductId).ToList();
            // newOrderItems = newOrderItems.OrderBy(x => x.ProductId).ToList();
            foreach (var orderItem in newOrderItemsExcepted)
            {
                currentProductIndex = products.FindIndex(x => x.Id == orderItem.ProductId);
                products[currentProductIndex].Quantity -= orderItem.Count;
            }
            
            //If order item changed self product count
            foreach (var orderItem in newOrderItems)
            {
                var currentOrderItem = oldOrderItems.FirstOrDefault(x => x.ProductId == orderItem.ProductId &&
                                                                                  x.ProductSize == orderItem.ProductSize);
                currentProductIndex = products.FindIndex(x => x.Id == orderItem.ProductId);

                if (currentOrderItem != null)
                {
                    if (orderItem.Count > currentOrderItem.Count && orderItem.ProductSize == currentOrderItem.ProductSize)
                    {
                        var differenceQuantity = orderItem.Count - currentOrderItem.Count;
                        products[currentProductIndex].Quantity -= differenceQuantity;
                    }
                }
            }
            
            return products;
        }
    }
}
