using System;
using Core.Enums;

namespace Core.Entities
{
    public class OrderItem: BaseEntity, IEquatable<OrderItem>
    {
        public string ProductId { get; set; }
        
        public virtual Product Product { get; set; }

        public string OrderId { get; set; }

        public virtual Order Order { get; set; }

        public Size ProductSize { get; set; }

        public uint Count { get; set; }

        public bool Equals(OrderItem other)
        {
            if (other is null)
                return false;

            return this.ProductId == other.ProductId && this.ProductSize == other.ProductSize;
        }

        public override bool Equals(object obj) => Equals(obj as OrderItem);
        public override int GetHashCode() => (ProductId, ProductSize).GetHashCode();
    }
}
