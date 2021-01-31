using System;
using Core.Repositories;
using Infastructure.Data;
using Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure
{
    public static class Startup
    {
        public static void InitializeInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<ShopContext>(opts => opts.UseSqlServer(configuration.GetConnectionString("Shop")));

            services.AddTransient<ICustomerRepository, CustomerRepository>();
            services.AddTransient<IOrderRepository, OrderRepository>();
            services.AddTransient<IProductRepository, ProductRepository>();
        }
    }
}
