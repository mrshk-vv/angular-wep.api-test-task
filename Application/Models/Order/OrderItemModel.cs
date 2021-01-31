using Application.Models.Base;
using Application.Models.Product;
using Core.Enums;

namespace Application.Models.Order
{
    public class OrderItemModel: BaseModel
    {
        public string ProductId { get; set; }

        public ProductModel Product { get; set; }

        public string OrderId { get; set; }

        public OrderModel Order { get; set; }

        public Size ProductSize { get; set; }

        public uint Count { get; set; }
    }
}
