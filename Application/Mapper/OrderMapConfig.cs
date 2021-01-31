using Application.Models.Order;
using AutoMapper;
using Core.Entities;

namespace Application.Mapper
{
    internal class OrderMapConfig: Profile
    {
        public OrderMapConfig()
        {
            CreateMap<Order, OrderModel>();
            CreateMap<OrderModel, Order>()
                .ForMember(x => x.Customer, opts => opts.Ignore());

            CreateMap<OrderItemModel, OrderItem>()
                .ForMember(x => x.Order, opts => opts.Ignore())
                .ForMember(x => x.Product, opts => opts.Ignore());
            CreateMap<OrderItem, OrderItemModel>();
        }
    }
}
