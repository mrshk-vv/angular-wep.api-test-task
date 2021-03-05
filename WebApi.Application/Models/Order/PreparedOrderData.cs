using System.Collections.Generic;

namespace Application.Models.Order
{
    public struct PreparedOrderData
    {
        public PreparedOrderData(List<Core.Entities.Product> productsWithUpdatedQuantity, decimal orderTotalCost)
        {
            ProductsWithUpdatedQuantity = productsWithUpdatedQuantity;
            OrderTotalCost = orderTotalCost;
        }

        public List<Core.Entities.Product> ProductsWithUpdatedQuantity{ get; private set; }
        
        public decimal OrderTotalCost { get; private set; }
    }
}