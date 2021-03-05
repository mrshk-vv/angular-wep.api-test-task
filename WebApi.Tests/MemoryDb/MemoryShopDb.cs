using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using WebApi.Tests.DataStorages.Product;

namespace WebApi.Tests.MemoryDb
{
    public enum DataSeedingSelector
    {
        Product = 1,
        Customer = 2,
        Order = 3,
    }
    public class MemoryShopDb
    {
        private static ShopContext _shopContext;
        private static object obj = new object();

        public static ShopContext GetShopContext(DataSeedingSelector dataSeedingSelector)
        {
            lock (obj)
            {
                if (_shopContext is null)
                {
                    var serviceProvider = new ServiceCollection()
                        .AddEntityFrameworkInMemoryDatabase()
                        .BuildServiceProvider();

                    var builder = new DbContextOptionsBuilder<ShopContext>()
                        .UseInMemoryDatabase("ShopDatabase")
                        .UseInternalServiceProvider(serviceProvider);

                    _shopContext = new ShopContext(builder.Options);
                }

                switch (dataSeedingSelector)
                {
                    case DataSeedingSelector.Product:
                        ProductDataSeeding();
                        break;
                    case DataSeedingSelector.Customer:
                        break;
                    case DataSeedingSelector.Order:
                        break;
                    default:
                        break;
                }
            }


            return _shopContext;
        }

        private static void ProductDataSeeding()
        {
            var products = new ProductTestDataProvider().GetProductList();
            products.ForEach(product =>
            {
                _shopContext.Add(product);
                _shopContext.SaveChanges();
                _shopContext.Entry(product).State = EntityState.Detached;
            });
        }
    }
}