using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Models.Order;

namespace Application.Interfaces
{
    public interface IOrderService
    {
        Task<List<OrderModel>> GetOrdersAsync();

        Task<OrderModel> GetOrderById(string orderId);

        Task<OrderModel> AddOrderAsync(OrderModel order);

        Task<OrderModel> UpdateOrderAsync(OrderModel order);

        Task RemoveOrderAsync(string orderId);
    }
}
