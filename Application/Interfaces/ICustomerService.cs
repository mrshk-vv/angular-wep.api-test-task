using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Models.Customer;

namespace Application.Interfaces
{
    public interface ICustomerService
    {
        Task<List<CustomerModel>> GetCustomersAsync();

        Task<CustomerModel> GetCustomerByIdAsync(string customerId);

        Task<CustomerModel> AddCustomerAsync(CustomerModel model);

        Task<CustomerModel> UpdateCustomerAsync(CustomerModel model);

        Task RemoveCustomerAsync(string customerId);
    }
}
