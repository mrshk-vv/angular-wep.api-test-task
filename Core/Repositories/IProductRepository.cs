using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Repositories
{
    public interface IProductRepository
    {
        
        Task<List<Product>> GetProductsAsync();

        Task<List<Product>> GetAvailableProducts();

        Task<List<Product>> GetProductsAsNoTracking();

        Task<Product> GetProductByIdAsync(string id);

        Task<Product> AddProductAsync(Product product);

        Task<Product> UpdateProductAsync(Product product);

        Task UpdateProductsAsync(List<Product> products);

        Task RemoveProductAsync(Product product);
    }
}
