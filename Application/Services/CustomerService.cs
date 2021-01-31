using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Exceptions;
using Application.Interfaces;
using Application.Models.Customer;
using AutoMapper;
using Core.Entities;
using Core.Repositories;

namespace Application.Services
{
    public class CustomerService: ICustomerService
    {
        private readonly ICustomerRepository _customerRepository;
        private readonly IMapper _mapper;

        public CustomerService(ICustomerRepository customerRepository, IMapper mapper)
        {
            _customerRepository = customerRepository;
            _mapper = mapper;
        }

        public async Task<List<CustomerModel>> GetCustomersAsync()
        {
            var customersList = await _customerRepository.GetCustomersAsync();

            return _mapper.Map<List<Customer>, List<CustomerModel>>(customersList);
        }

        public async Task<CustomerModel> GetCustomerByIdAsync(string customerId)
        {
            if (string.IsNullOrEmpty(customerId))
            {
                throw new ApplicationException("Customer Id is wrong");
            }

            var customer = await _customerRepository.GetCustomerByIdAsync(customerId);

            if (customer is null)
            {
                throw new ApplicationException($"Customer with Id : {customerId} is not exist");
            }

            return _mapper.Map<Customer, CustomerModel>(customer);
        }

        public async Task<CustomerModel> AddCustomerAsync(CustomerModel model)
        {
            var customer = _mapper.Map<CustomerModel, Customer>(model);

            var createdCustomer = await _customerRepository.AddCustomerAsync(customer);

            return _mapper.Map<Customer, CustomerModel>(createdCustomer);

        }

        public async Task<CustomerModel> UpdateCustomerAsync(CustomerModel model)
        {
            throw new System.NotImplementedException();
        }

        public async Task RemoveCustomerAsync(string customerId)
        {
            if (string.IsNullOrEmpty(customerId))
            {
                throw new ApplicationException("Customer Id is wrong");
            }

            var customer = await _customerRepository.GetCustomerByIdAsync(customerId);

            if (customer is null)
            {
                throw new ApplicationException($"Customer with Id : {customerId} is not exist");
            }

            await _customerRepository.RemoveCustomerAsync(customer);
        }
    }
}
