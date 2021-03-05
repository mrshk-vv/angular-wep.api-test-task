using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection;
using Core.Enums;

namespace Core.Entities
{
    public class Order: IBaseEntity
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public string Id { get; set; }

        public DateTime CreatedDate { get; set; }
        public string CustomerId { get; set; }

        public Customer Customer { get; set; }

        public Status Status { get; set; }

        public decimal TotalCost { get; set; }

        public string Comment { get; set; }

        public virtual List<OrderItem> OrderItems { get; set; }

        
    }
}
