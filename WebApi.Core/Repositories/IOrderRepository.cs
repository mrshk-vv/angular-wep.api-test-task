using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Repositories
{
    public interface IOrderRepository
    {
        Task<List<Order>> GetOrdersAsync();

        Task<Order> GetOrderByIdAsync(string id);

        Task<Order> GetOrderByIdAsNoTrackingAsync(string id);

        Task<bool> IsOrderExistAsync(string id);

        Task<Order> AddOrderAsync(Order order);

        Task<Order> UpdateOrderAsync(Order updatedOrder);

        Task<bool> RemoveOrderAsync(Order order);
    }
}
