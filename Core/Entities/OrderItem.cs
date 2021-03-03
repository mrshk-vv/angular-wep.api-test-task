using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Core.Enums;

namespace Core.Entities
{
    public class OrderItem: IBaseEntity, IEquatable<OrderItem>
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public string Id { get; set; }

        public DateTime CreatedDate { get; set; }
        
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
