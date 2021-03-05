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
    public class ProductRepository: BaseRepository<Product>, IProductRepository
    {
        public ProductRepository(ShopContext shopContext) : base(shopContext) { }


        public async Task<List<Product>> GetProductsAsync()
        {
            return await GetAll();
        }

        public async Task<List<Product>> GetAvailableProducts()
        {
            return _shopContext.Products.Where(x => x.Quantity > 0).ToList();
        }

        public async Task<List<Product>> GetProductsAsNoTracking()
        {
            return await GetAllAsNoTracking();
        }

        public async Task<Product> GetProductByIdAsync(string id)
        {
            return await GetById(id);
        }

        public async Task<bool> IsProductExist(string id)
        {
            return await IsExist(id);
        }

        public async Task<Product> AddProductAsync(Product product)
        {
            return await Add(product);
        }

        public async Task<Product> UpdateProductAsync(Product product)
        {
            return await Update(product);
        }

        public async Task UpdateProductsAsync(List<Product> products)
        {
            await UpdateRange(products);
        }

        public async Task<bool> RemoveProductAsync(Product product)
        {
            await Remove(product);
            return true;
        }
    }
}
