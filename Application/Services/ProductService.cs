using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Exceptions;
using Application.Interfaces;
using Application.Models.Product;
using AutoMapper;
using Core.Entities;
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
            if (string.IsNullOrEmpty(productId))
            {
                throw new ApplicationException($"Product Id is wrong");
            }

            var product = await _productRepository.GetProductByIdAsync(productId);

            if (product is null)
            {
                throw new ApplicationException($"Customer with Id : {productId} is not exist");
            }

            return _mapper.Map<Product, ProductModel>(product);
        }

        public async Task<ProductModel> AddProductAsync(ProductModel productModel)
        {
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
            var product = _mapper.Map<ProductModel, Product>(productModel);

            var updatedProduct = await _productRepository.UpdateProductAsync(product);

            return _mapper.Map<Product, ProductModel>(updatedProduct);
        }

        public async Task RemoveProductAsync(string productId)
        {
            if (string.IsNullOrEmpty(productId))
            {
                throw new ApplicationException("Product Id is not exist");
            }

            var product = await _productRepository.GetProductByIdAsync(productId);

            if (product is null)
            {
                throw new ApplicationException($"Product with Id : {productId} is not exist");
            }

            await _productRepository.RemoveProductAsync(product);
        }
    }
}
