using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Application.Models.Base;
using Application.Models.Order;

namespace Application.Models.Customer
{
    public class CustomerModel: BaseModel
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Address { get; set; }

        public List<OrderModel> Orders { get; set; }
    }
}
