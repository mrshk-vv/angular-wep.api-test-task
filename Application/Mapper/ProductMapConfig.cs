using Application.Models.Product;
using AutoMapper;
using Core.Entities;

namespace Application.Mapper
{
    internal class ProductMapConfig: Profile
    {
        public ProductMapConfig()
        {
            CreateMap<Product, ProductModel>();
            CreateMap<ProductModel, Product>();
        }
    }
}
