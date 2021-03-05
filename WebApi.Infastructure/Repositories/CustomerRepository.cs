using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities;
using Infrastructure.Repositories.Base;
using Core.Repositories;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class CustomerRepository: BaseRepository<Customer>, ICustomerRepository
    {
        public CustomerRepository(ShopContext shopContext) : base(shopContext) { }

        public async Task<List<Customer>> GetCustomersAsync()
        {
            return await _shopContext.Customers
                                     .Include(x => x.Orders)
                                     .ToListAsync();
        }

        public async Task<Customer> GetCustomerByIdAsync(string id)
        {
            return await GetById(id);
        }

        public async Task<Customer> AddCustomerAsync(Customer customer)
        {
            return await Add(customer);
        }

        public async Task<Customer> UpdateCustomerAsync(Customer customer)
        {
            return await Update(customer);
        }

        public async Task<bool> RemoveCustomerAsync(Customer customer)
        {
            await Remove(customer);
            return true;
        }
    }
}
