using System;
using System.Collections.Generic;
using System.Reflection;
using System.Runtime.Serialization.Formatters;
using Core.Enums;

namespace Core.Entities
{
    public class Order: BaseEntity
    {

        public string CustomerId { get; set; }

        public Customer Customer { get; set; }

        public Status Status { get; set; }

        public decimal TotalCost { get; set; }

        public string Comment { get; set; }

        public virtual List<OrderItem> OrderItems { get; set; }

        
    }
}
