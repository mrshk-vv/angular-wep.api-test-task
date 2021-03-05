using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Errors;
using Application.Mapper;
using Application.Models.Product;
using Application.Services;
using AutoMapper;
using Core.Enums;
using Core.Repositories;
using Moq;
using WebApi.Tests.DataStorages.Product;
using Xunit;
using ApplicationException = Application.Exceptions.ApplicationException;

namespace WebApi.Tests.Services.Product
{
    public class ProductServiceTests
    {
        private Mock<IProductRepository> _productMockRepo = new Mock<IProductRepository>();
        private ProductService _sut;
        private readonly IMapper _mapper;
        private readonly ProductTestDataProvider _productTestDataProvider;
        private const int FIRST_PRODUCT = 0;
        

        public ProductServiceTests()
        {
            var mapperConfig = new MapperConfiguration(configuration =>
            {
                configuration.AddProfile(new ProductMapConfig());
                configuration.AddProfile(new CustomerMapConfig());
                configuration.AddProfile(new OrderMapConfig());
            });
            _mapper = mapperConfig.CreateMapper();

            _sut = new ProductService(_productMockRepo.Object, _mapper);
            _productTestDataProvider = new ProductTestDataProvider();
        }

        [Fact]
        public async Task GetProductById_ShouldReturnProduct_WhenProductExist()
        {
            //Arrange
            var productId = Guid.NewGuid().ToString();
            var productExpected = new Core.Entities.Product
            {
                Id = productId,
                Name = "Cucumber",
                Category = Category.Vegetables,
                Price = 99,
                Quantity = 100
            };

            _productMockRepo.Setup(x => x.IsProductExist(productId))
                            .ReturnsAsync(true);
            
            _productMockRepo.Setup(x => x.GetProductByIdAsync(productId))
                .ReturnsAsync(productExpected);

            //Act
            var productActual = await _sut.GetProductByIdAsync(productId);

            //Assert
            Assert.NotNull(productExpected);
            Assert.Equal(productActual.Id, productExpected.Id);
        }

        [Fact]
        public async Task GetProductById_ShouldThrowException_WhenProductNotExist()
        {
            //Arrange
            var productId = Guid.NewGuid().ToString();
            bool hasNormalWorking = false;
            
            _productMockRepo.Setup(x => x.GetProductByIdAsync(It.IsAny<Guid>().ToString()))
                            .ReturnsAsync(() => null);

            //Act
            try
            {
                await _sut.GetProductByIdAsync(productId);
            }
            catch(ApplicationException) 
            {
                hasNormalWorking = true;
            }
            
            //Assert
            if (hasNormalWorking)
            {
                Assert.True(hasNormalWorking);
            }
            else
            {
                Assert.False(!hasNormalWorking);
            }
        }
        
        [Theory]
        [InlineData(null)]
        [InlineData("")]
        [InlineData(" ")]
        public async Task GetProductById_ShouldThrowException_WhenProductIdInvalid(string id)
        {
            //Arrange
            bool hasNormalWorking = false;

            //Act
            try
            {
                await _sut.GetProductByIdAsync(id);
            }
            catch(ApplicationException) 
            {
                hasNormalWorking = true;
            }
            
            //Assert
            if (hasNormalWorking)
            {
                Assert.True(hasNormalWorking);
            }
            else
            {
                Assert.False(!hasNormalWorking);
            }
        }
        
        [Fact]
        public async Task GetProducts_ShouldReturnList()
        {
            //Arrange
            _productMockRepo.Setup(x => x.GetProductsAsync())
                .ReturnsAsync(_productTestDataProvider.GetProductList());

            //Act
            var products = await _sut.GetProductsAsync();
            
            //Assert
            Assert.NotNull(products);
            Assert.IsAssignableFrom<IEnumerable<ProductModel>>(products);
        }

        [Fact]
        public async Task GetAvailableProducts_ShouldReturnList()
        {
            //Arrange
            _productMockRepo.Setup(x => x.GetAvailableProducts())
                .ReturnsAsync(_productTestDataProvider.GetProductList().Where(x => x.Quantity > 0).ToList());

            //Act
            var availableProducts = await _sut.GetAvailableProducts();

            //Assert
            Assert.NotNull(availableProducts);
            Assert.Contains(availableProducts, product => product.Quantity > 0);
        }

        [Theory]
        [ClassData(typeof(ProductTestData))]
        public async Task AddProduct_ShouldThrowException_WhenInputDataIsInvalid(string name, 
                                                                                  decimal price, 
                                                                                  Category category, 
                                                                                  uint quantity)
        {
            //Arrange
            var productId = Guid.NewGuid().ToString();
            var product = new ProductModel
            {
                Id = productId,
                Category = category,
                CreatedDate = DateTime.Now,
                Description = "test",
                Name = name,
                Quantity = quantity
            };

            //Act
            bool correctBehaviour = false;
            
            try
            {
                await _sut.AddProductAsync(product);
            }
            catch (ApplicationException)
            {
                correctBehaviour = true;
            }

            //Assert
            Assert.True(correctBehaviour);
        }
        
        [Fact]
        public async Task AddProduct_ShouldReturnProduct_WhenInputDataIsCorrect()
        {
            //Arrange
            var productId = Guid.NewGuid().ToString();
            var actualProduct = new ProductModel
            {
                Name = "test",
                Price = 1,
                Category = Category.Foods,
                Quantity = 2
            };
            
            var addingProduct = new Core.Entities.Product
            {
                Name = actualProduct.Name,
                Price = actualProduct.Price,
                Category = actualProduct.Category,
                Quantity = actualProduct.Quantity
            };
            
            _productMockRepo
                .Setup(x => x.AddProductAsync(It.IsAny<Core.Entities.Product>()))
                .ReturnsAsync((Core.Entities.Product p) => {
                    p.Id = productId;
                    return p;
                });
            
            //Act
            var result = await _sut.AddProductAsync(actualProduct);
            
            //Assert
            
            Assert.Equal(productId, result.Id);
            _productMockRepo.Verify(x => 
                x.AddProductAsync(It.Is<Core.Entities.Product>(p => addingProduct.Name == p.Name &&
                                                                    productId == p.Id)), Times.Once);
        }

        [Fact]
        public async Task RemoveProduct_ShouldReturnTrue_WhenProductExist()
        {
            //Arrange
            var productId = Guid.NewGuid().ToString();
            var product = _productTestDataProvider.GetProductList()[FIRST_PRODUCT];
            product.Id = productId;
            _productMockRepo.Setup(x => x.IsProductExist(product.Id))
                .ReturnsAsync(true);
            _productMockRepo.Setup(x => x.GetProductByIdAsync(product.Id))
                            .ReturnsAsync(product);
            _productMockRepo.Setup(x => x.RemoveProductAsync(It.IsAny<Core.Entities.Product>()))
                            .ReturnsAsync(true);
            
            //Act
            var result = await _sut.RemoveProductAsync(product.Id);

            //Assert
            Assert.True(result);
        }

        [Theory]
        [InlineData(null)]
        [InlineData("")]
        [InlineData(" ")]
        public async Task RemoveProduct_ShouldReturnException_WhenProductIdIsEmpty(string id)
        {
            //Arrange
            var correctBehaviour = false;
            var expectedErrorMessage = "Product Id is wrong";
            var actualErrorMessage = string.Empty;
            
            //Act
            try
            {
                await _sut.RemoveProductAsync(id);
            }
            catch (ApplicationException e)
            {
                correctBehaviour = true;
                actualErrorMessage = e.Message;
            }
            
            //Assert
            Assert.True(correctBehaviour);
            Assert.Equal(expectedErrorMessage, actualErrorMessage);
        }

        [Fact]
        public async Task RemoveProduct_ShouldReturnException_WhenProductDoesNotExist()
        {
            //Arrange
            var productId = Guid.NewGuid().ToString();
            var correctBehaviour = false;
            var expectedErrorMessage = $"Product with Id : {productId} does not exist";
            var actualErrorMessage = string.Empty;
            _productMockRepo.Setup(x => x.GetProductByIdAsync(productId))
                            .ReturnsAsync(() => null);

            //Act
            try
            {
                await _sut.RemoveProductAsync(productId);
            }
            catch (ApplicationException e)
            {
                correctBehaviour = true;
                actualErrorMessage = e.Message;
            }
            
            //Assert
            Assert.True(correctBehaviour);
            Assert.Equal(expectedErrorMessage, actualErrorMessage);
        }

        [Fact]
        public async Task UpdateProduct_ShouldReturnProduct_WhenProductExistAndDataForEditIsCorrect()
        {
            //Arrange
            var productId = Guid.NewGuid().ToString();
            var editingProduct = new ProductModel
            {
                Id = productId,
                Name = "test",
                Category = Category.Foods,
                CreatedDate = DateTime.Now,
                Description = "test",
                Price = 111,
                Quantity = 111
            };
            var productFromDb = _mapper.Map<ProductModel, Core.Entities.Product>(editingProduct);

            var editedProduct = new ProductModel
            {
                Id = editingProduct.Id,
                Name = "test 1",
                Category = Category.Drinks,
                Description = "new description",
                Price = 222,
                Quantity = 222
            };

            _productMockRepo.Setup(x => x.IsProductExist(productId))
                .ReturnsAsync(true);
            _productMockRepo.Setup(x => x.GetProductByIdAsync(productId))
                .ReturnsAsync(productFromDb);
            _productMockRepo.Setup(x => x.UpdateProductAsync(It.IsAny<Core.Entities.Product>()))
                .ReturnsAsync((Core.Entities.Product p) => p);
            
            //Act
            var updatedProduct = await _sut.UpdateProductAsync(editedProduct);
            
            //Assert
            Assert.NotNull(updatedProduct);
            _productMockRepo.Verify(x => x.UpdateProductAsync(It.Is<Core.Entities.Product>(p => p.Id == editedProduct.Id &&
                                                                                                                p.Name == editedProduct.Name &&
                                                                                                                p.Category == editedProduct.Category &&
                                                                                                                p.Price == editedProduct.Price &&
                                                                                                                p.Quantity == editedProduct.Quantity &&
                                                                                                                p.Description == editedProduct.Description)), Times.Once);
            Assert.Equal(editedProduct.Id, updatedProduct.Id);
            Assert.Equal(editedProduct, updatedProduct);
        }

        [Theory]
        [ClassData(typeof(ProductTestData))]
        public async Task UpdateProduct_ShouldThrowException_WhenUpdatedDataIsIncorrect(string name,
                                                                                        decimal price,
                                                                                        Category category,
                                                                                        uint quantity)
        {
            //Arrange
            var productId = Guid.NewGuid().ToString();
            var product = new ProductModel
            {
                Id = productId,
                Name = name,
                Price = price,
                Category = category,
                Quantity = quantity
            };
            var errorMessage = string.Empty;
            var correctBehaviour = false;
            _productMockRepo.Setup(x => x.IsProductExist(product.Id))
                            .ReturnsAsync(true);

            //Act
            try
            {
                await _sut.UpdateProductAsync(product);
            }
            catch (ApplicationException e)
            {
                correctBehaviour = true;
                errorMessage = e.Message;
            }

            //Assert
            Assert.True(correctBehaviour);
            var enumMessage = (ProductsInvalidInputDataErrors)Enum.Parse(typeof(ProductsInvalidInputDataErrors), errorMessage);
            Assert.IsType<ProductsInvalidInputDataErrors>(enumMessage);
        }

        [Theory]
        [InlineData(null)]
        [InlineData("")]
        [InlineData(" ")]
        public async Task UpdateProduct_ShouldThrowException_WhenProductIdInvalid(string id)
        {
            //Arrange
            var correctBehaviour = false;
            var product = new ProductModel {Id = id};
            //Act
            try
            {
                await _sut.UpdateProductAsync(product);
            }
            catch (ApplicationException )
            {
                correctBehaviour = true;
            }

            //Assert
            Assert.True(correctBehaviour);
        }
        
        [Fact]
        public async Task UpdateProduct_ShouldThrowException_WhenProductIdDoesNotExist()
        {
            //Arrange
            var correctBehaviour = false;
            var product = new ProductModel {Id = Guid.NewGuid().ToString()};
            _productMockRepo.Setup(x => x.IsProductExist(product.Id))
                            .ReturnsAsync(false);

            //Act
            try
            {
                await _sut.UpdateProductAsync(product);
            }
            catch (ApplicationException)
            {
                correctBehaviour = true;
            }

            //Assert
            Assert.True(correctBehaviour);
        }
    }

    public class ProductTestData : IEnumerable<object[]>
    {
        object[] invalidPrice = new object[]
        {
            "dasdasd",
            -23, //Invalid price
             Category.Drinks,
             111
        };

        object[] invalidQuantity = new object[]
        {
            "dasdasd",
            23,
            Category.Drinks,
            0 //Invalid quantity
        };

        object[] withoutName = new object[]
        {
            null, //Without name
            23,
            Category.Drinks,
            23
        };

        object[] emptyName = new object[]
        {
            "", //Empty name
            23,
            Category.Drinks,
            34
        };

        object[] withoutCategory = new object[]
        {
            "dasdadasd",
            23,
            Category.None,
            234
        };



        public IEnumerator<object[]> GetEnumerator()
        {
            yield return invalidPrice;
            yield return invalidQuantity;
            yield return withoutName;
            yield return emptyName;
            yield return withoutCategory;
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            yield return invalidPrice;
            yield return invalidQuantity;
            yield return withoutName;
            yield return emptyName;
            yield return withoutCategory;
        }
    }
}
