using System;
using Application.Interfaces;
using Application.Mapper;
using Application.Services;
using AutoMapper;
using Infrastructure;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Application
{
    public static class Startup
    {
        public static void InitializeApplication(this IServiceCollection services, IConfiguration configuration)
        {
            services.InitializeInfrastructure(configuration);

            var mapperConfig = new MapperConfiguration(configuration =>
            {
                configuration.AddProfile(new ProductMapConfig());
                configuration.AddProfile(new CustomerMapConfig());
                configuration.AddProfile(new OrderMapConfig());
            });
            var mapper = mapperConfig.CreateMapper();
            services.AddSingleton(mapper);

            services.AddTransient<ICustomerService, CustomerService>();
            services.AddTransient<IProductService, ProductService>();
            services.AddTransient<IOrderService, OrderService>();


        }
    }
}
