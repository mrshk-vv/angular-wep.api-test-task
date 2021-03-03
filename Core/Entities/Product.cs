using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Core.Enums;

namespace Core.Entities
{
    public class Product: IBaseEntity
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public string Id { get; set; }

        public DateTime CreatedDate { get; set; }
        
        public string Name { get; set; }

        public Category Category { get; set; }

        public uint Quantity { get; set; }

        public decimal Price { get; set; }

        public string Description { get; set; }
    }
}
