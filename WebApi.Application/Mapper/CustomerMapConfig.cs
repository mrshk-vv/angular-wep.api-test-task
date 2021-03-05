using Application.Models.Customer;
using AutoMapper;
using Core.Entities;

namespace Application.Mapper
{
    public class CustomerMapConfig: Profile
    {
        public CustomerMapConfig()
        {
            CreateMap<Customer, CustomerModel>()
                .ForMember(o => o.Orders, opts => opts.MapFrom(x => x.Orders));
            CreateMap<CustomerModel, Customer>();
        }
    }
}
