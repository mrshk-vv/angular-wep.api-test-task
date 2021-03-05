using System;
using System.ComponentModel.DataAnnotations;
using Application.Models.Base;
using Core.Enums;

namespace Application.Models.Product
{
    public class ProductModel: BaseModel
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public Category Category { get; set; }

        [Required]
        public uint Quantity { get; set; }

        [Required]
        public decimal Price { get; set; }

        public string Description { get; set; }

        public override bool Equals(Object obj)
        {
            if ((obj == null) || !GetType().Equals(obj.GetType()))
                return false;
            
            ProductModel p = (ProductModel) obj;
            return Name == p.Name &&
                   Price == p.Price &&
                   Quantity == p.Quantity &&
                   Category == p.Category &&
                   Description == p.Description;
        }

        public override int GetHashCode()
        {
            return base.GetHashCode();
        }
    }
}
