using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Models.Product;
using Core.Entities;

namespace Application.Interfaces
{
    public interface IProductService
    {
        Task<List<ProductModel>> GetProductsAsync();

        Task<List<ProductModel>> GetAvailableProducts();

        Task<ProductModel> GetProductByIdAsync(string productId);

        Task<ProductModel> AddProductAsync(ProductModel productModel);

        Task UpdateProductQuantitiesAsync(List<Product> products);

        Task<ProductModel> UpdateProductAsync(ProductModel productModel);

        Task RemoveProductAsync(string productId);

    }
}
