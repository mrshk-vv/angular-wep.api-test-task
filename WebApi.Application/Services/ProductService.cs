using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Errors;
using Application.Exceptions;
using Application.Interfaces;
using Application.Models.Product;
using AutoMapper;
using Core.Entities;
using Core.Enums;
using Core.Repositories;

namespace Application.Services
{
    public class ProductService: IProductService
    {
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;

        public ProductService(IProductRepository productRepository, IMapper mapper)
        {
            _productRepository = productRepository;
            _mapper = mapper;
        }

        public async Task<List<ProductModel>> GetProductsAsync()
        {
            var products = await _productRepository.GetProductsAsync();

            return _mapper.Map<List<Product>, List<ProductModel>>(products);
        }

        public async Task<List<ProductModel>> GetAvailableProducts()
        {
            var products = await _productRepository.GetAvailableProducts();
            return _mapper.Map<List<Product>, List<ProductModel>>(products);
        }

        public async Task<ProductModel> GetProductByIdAsync(string productId)
        {
            await ProductExistCheck(productId);
            var product = await _productRepository.GetProductByIdAsync(productId);

            return _mapper.Map<Product, ProductModel>(product);
        }

        public async Task<ProductModel> AddProductAsync(ProductModel productModel)
        {
            var checkProductData = InvalidProductInfo(productModel);
            if (checkProductData.result)
                throw new ApplicationException($"{checkProductData.message.ToString()}");

            var product = _mapper.Map<ProductModel, Product>(productModel);
            var addedProduct = await _productRepository.AddProductAsync(product);

            return _mapper.Map<Product, ProductModel>(addedProduct);
        }

        public async Task UpdateProductQuantitiesAsync(List<Product> products)
        {
            await _productRepository.UpdateProductsAsync(products);
        }

        public async Task<ProductModel> UpdateProductAsync(ProductModel productModel)
        {
            await ProductExistCheck(productModel.Id);
            var checkProductData = InvalidProductInfo(productModel);
            if (checkProductData.result)
                throw new ApplicationException($"{checkProductData.message.ToString()}");
            
            var product = _mapper.Map<ProductModel, Product>(productModel);
            var updatedProduct = await _productRepository.UpdateProductAsync(product);

            return _mapper.Map<Product, ProductModel>(updatedProduct);
        }

        public async Task<bool> RemoveProductAsync(string productId)
        {
            await ProductExistCheck(productId);
            var product = await _productRepository.GetProductByIdAsync(productId);
            var result = await _productRepository.RemoveProductAsync(product);

            return result;
        }
        
        private async Task ProductExistCheck(string productId)
        {
            if (string.IsNullOrEmpty(productId) || string.IsNullOrWhiteSpace(productId))
                throw new ApplicationException("Product Id is wrong");

            var productExist = await _productRepository.IsProductExist(productId);
            if (!productExist)
                throw new ApplicationException($"Product with Id : {productId} does not exist");
        }

        private (bool result, ProductsInvalidInputDataErrors message) InvalidProductInfo(ProductModel product)
        {
            if (string.IsNullOrEmpty(product.Name) || string.IsNullOrWhiteSpace(product.Name))
                return (true, ProductsInvalidInputDataErrors.IncorrectProductName);

            if (product.Quantity == 0)
                return (true, ProductsInvalidInputDataErrors.IncorrectProductQuantity);

            if (product.Price <= 0)
                return (true, ProductsInvalidInputDataErrors.IncorrectProductPrice);

            if (product.Category == Category.None)
                return (true, ProductsInvalidInputDataErrors.IncorrectProductCategory);

            return (false, ProductsInvalidInputDataErrors.None);
        }
    }
}
