using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Application.Models.Base;
using Application.Models.Customer;
using Core.Enums;

namespace Application.Models.Order
{
    public class OrderModel: BaseModel
    {
        [Required]
        public string CustomerId { get; set; }

        public CustomerModel Customer { get; set; }

        [Required]
        public Status Status { get; set; }

        public decimal? TotalCost { get; set; }

        public string Comment { get; set; }

        public List<OrderItemModel> OrderItems { get; set; }
    }
}
