using System;
using System.Linq;
using System.Threading.Tasks;
using Core.Enums;
using Core.Repositories;
using Infrastructure.Data;
using Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using WebApi.Tests.MemoryDb;
using Xunit;

namespace WebApi.Tests.Repositories.Product
{
    public class ProductRepositoriesTests
    {
        private readonly ShopContext _shopContext;
        private readonly IProductRepository _productRepository;
        

        public ProductRepositoriesTests()
        {
            _shopContext = MemoryShopDb.GetShopContext(DataSeedingSelector.Product);
            _productRepository = new ProductRepository(_shopContext);
        }

        [Fact]
        public async Task GetAllProduct_ShouldReturnProductList()
        {
            //Arrange
            var expectedProducts = await _shopContext.Products.ToListAsync();
            
            //Act
            var actualProducts = await _productRepository.GetProductsAsync();
            
            //Assert
            Assert.Equal(expectedProducts.Count(), actualProducts.Count());
        }

        [Fact]
        public async Task GetAvailableProducts_ShouldReturnProducts_WhichQuantityGreaterThanZero()
        {
            //Arrange
            var expectedAvailableProducts = await _shopContext.Products.Where(x => x.Quantity > 0).ToListAsync();
            
            //Act
            var actualAvailableProducts = await _productRepository.GetAvailableProducts();
            
            //Assert
            Assert.Equal(expectedAvailableProducts.Count(), actualAvailableProducts.Count());
        }

        [Fact]
        public async Task GetProductById_ShouldReturnProduct_WhereExpectedProductIdEqualsActual()
        {
            //Arrange
            var expectedProduct = _shopContext.Products.First();

            //Act
            var actualProduct = await _productRepository.GetProductByIdAsync(expectedProduct.Id);

            //Assert
            Assert.Equal(expectedProduct.Id, actualProduct.Id);

        }
        
        [Fact]
        public async Task GetProductById_ShouldReturnNull_WhenProductDoesNotExist()
        {
            //Arrange
            var doesntExistingProductId = Guid.NewGuid().ToString();

            //Act
            var actualProduct = await _productRepository.GetProductByIdAsync(doesntExistingProductId);

            //Assert
            Assert.Null(actualProduct);
        }

        [Fact]
        public async Task GetIsProductExist_ShouldReturnTrue_WhenProductExist()
        {
            //Arrange
            var existingProductId = _shopContext.Products.First().Id;
            
            //Act
            var result = await _productRepository.IsProductExist(existingProductId);

            //Assert
            Assert.True(result);
        }

        [Fact]
        public async Task GetProductsAsNoTracking_ShouldReturnProductList()
        {
            //Arrange
            var expectedProducts = await _shopContext.Products.AsNoTracking().ToListAsync();

            //Act
            var actualProducts = await _productRepository.GetProductsAsNoTracking();

            //Assert
            Assert.Equal(expectedProducts.Count(), actualProducts.Count());
        }

        [Fact]
        public async Task AddProduct_ShouldReturnProduct()
        {
            //Arrange
            var addingProduct = new Core.Entities.Product
            {
                Name = "sdasdasda",
                Description = "dadasda",
                Price = 11111,
                Quantity = 23131,
                Category = Category.Dessert
            };
            
            //Act
            var actualProduct = await _productRepository.AddProductAsync(addingProduct);
            
            //Assert
            Assert.NotNull(actualProduct.Id);
            Assert.NotNull(actualProduct.CreatedDate);
        }

        [Fact]
        public async Task UpdateProductAsync_ShouldReturnUpdatedProduct()
        {
            //Arrange
            _shopContext.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
            var changedName = "cucumber";
            var initialProduct = _shopContext.Products.AsNoTracking().First();
            initialProduct.Name = changedName;
            //Act
            _shopContext.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.TrackAll;
            var actualProduct = await _productRepository.UpdateProductAsync(initialProduct);

            //Assert
            Assert.Equal(initialProduct.Id, actualProduct.Id);
            Assert.Equal(actualProduct.Name, changedName);
        }

        [Fact]
        public async Task RemoveProductAsync_ShouldRemoveProduct()
        {
            //Arrange
            var removingProduct = await _shopContext.Products.AsNoTracking().FirstOrDefaultAsync();
                
            //Act
            await _productRepository.RemoveProductAsync(removingProduct);
            var products = await _shopContext.Products.AsNoTracking().ToListAsync();
            
            //Assert
            Assert.True(!products.Contains(removingProduct));
        }
        
        //Arrange
            
        //Act
            
        //Assert
       
    }
}