using System;
using System.Linq;
using System.Threading.Tasks;
using Core.Enums;
using Core.Repositories;
using Infastructure.Data;
using Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Tests.DataStorages.Product;
using Tests.MemoryDb;
using Xunit;

namespace Tests.Repositories.Product
{
    public class ProductRepositoriesTests
    {
        private readonly ShopContext _shopContext;
        private readonly IProductRepository _productRepository;
        

        public ProductRepositoriesTests()
        {
            _shopContext = MemoryShopDb.GetShopContext(DataSeedingSelector.Product);
            _shopContext.Products.AddRange(new ProductTestDataProvider().GetProductList());
            _shopContext.SaveChanges();

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
            Assert.Equal(expectedProducts, actualProducts);
        }

        [Fact]
        public async Task GetAvailableProducts_ShouldReturnProducts_WhichQuantityGreaterThanZero()
        {
            //Arrange
            var expectedAvailableProducts = await _shopContext.Products.Where(x => x.Quantity > 0).ToListAsync();
            
            //Act
            var actualAvailableProducts = await _productRepository.GetAvailableProducts();
            
            //Assert
            Assert.Equal(expectedAvailableProducts, actualAvailableProducts);
        }

        [Fact]
        public async Task GetProductById_ShouldReturnProduct_WhereExpectedProductIdEqualsActual()
        {
            //Arrange
            var expectedProduct = _shopContext.Products.First();

            //Act
            var actualProduct = await _productRepository.GetProductByIdAsync(expectedProduct.Id);

            //Assert
            Assert.Equal(expectedProduct, actualProduct);

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
            var updatingProduct = new Core.Entities.Product
            {
                Id = "7804f35e-0739-4a4c-9e2d-f36df98dc7b3",
                CreatedDate = DateTime.Now,
                Category = Category.Dessert,
                Name = "asdada0",
                Description = "adasda",
                Price = 222,
                Quantity = 222
            };
            //Act
            var actualProduct = await _productRepository.UpdateProductAsync(updatingProduct);

            //Assert
            Assert.Equal(updatingProduct.Id, actualProduct.Id);
            Assert.True(updatingProduct.Name != actualProduct.Name);
            Assert.True(updatingProduct.Category != actualProduct.Category);
            Assert.True(updatingProduct.Description != actualProduct.Description);
            Assert.True(updatingProduct.Price != actualProduct.Price);
            Assert.True(updatingProduct.Quantity != actualProduct.Quantity);
            _shopContext.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.TrackAll;
        }
        
        //Arrange
            
        //Act
            
        //Assert
       
    }
}