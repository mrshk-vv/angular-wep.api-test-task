using System.Collections.Generic;

namespace Core.Entities
{
    public class Customer: BaseEntity
    {
        public string Name { get; set; }

        public string Address { get; set; }

        public virtual List<Order> Orders { get; set; }
    }
}
