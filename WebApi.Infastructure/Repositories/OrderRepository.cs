using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Repositories;
using Infrastructure.Data;
using Infrastructure.Repositories.Base;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class OrderRepository : BaseRepository<Order>, IOrderRepository
    {

        public OrderRepository(ShopContext shopContext) : base(shopContext) { }

        public async Task<List<Order>> GetOrdersAsync()
        {
            return await _shopContext.Orders
                                     .Include(x => x.Customer)
                                     .ToListAsync();
        }

        public async Task<Order> GetOrderByIdAsync(string id)
        {
            return await _shopContext.Orders.Where(x => x.Id == id)
                                            .Include(x => x.Customer)
                                            .Include(x => x.OrderItems)
                                            .ThenInclude(x => x.Product)
                                            .FirstOrDefaultAsync();
        }

        public async Task<Order> GetOrderByIdAsNoTrackingAsync(string id)
        {
            return await _shopContext.Orders.AsNoTracking().Include(x => x.Customer)
                                                           .AsNoTracking()
                                                           .Include(x => x.OrderItems)
                                                           .AsNoTracking()
                                                           .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<bool> IsOrderExistAsync(string id)
        {
            return await IsExist(id);
        }

        public async Task<Order> AddOrderAsync(Order order)
        {
            return await Add(order);
        }

        public async Task<Order> UpdateOrderAsync(Order updatedOrder)
        {
            return await Update(updatedOrder);
        }

        public async Task<bool> RemoveOrderAsync(Order order)
        {
            await Remove(order);
            return true;
        }
    }
}
