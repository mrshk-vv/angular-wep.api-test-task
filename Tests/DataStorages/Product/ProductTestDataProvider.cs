using System;
using System.Collections.Generic;
using Core.Enums;

namespace Tests.DataStorages.Product
{
    public class ProductTestDataProvider
    {
       
        public List<Core.Entities.Product> GetProductList()
        {
            return new List<Core.Entities.Product>
            {
                new Core.Entities.Product
                {
                    Id = "333c9536-f87d-4a85-88ce-a76c70262879",
                    Name = "dasda",
                    Category = Category.Foods,
                    CreatedDate = DateTime.Now,
                    Description = "dasda",
                    Price = 22.40m,
                    Quantity = 22
                },
                new Core.Entities.Product
                {
                    Id = "7804f35e-0739-4a4c-9e2d-f36df98dc7b3",
                    Name = "dadasdasda",
                    Category = Category.Vegetables,
                    CreatedDate = DateTime.Now,
                    Description = "dasda",
                    Price = 52.40m,
                    Quantity = 2200
                },
                new Core.Entities.Product
                {
                    Id = "e10d4119-b698-425b-b281-5330a5b533b9",
                    Name = "dfs",
                    Category = Category.Foods,
                    CreatedDate = DateTime.Now,
                    Description = "dasfdssdda",
                    Price = 26.40m,
                    Quantity = 220
                },
                new Core.Entities.Product
                {
                    Id = "9d08e7b4-a784-45cb-83bf-7e2864edc532",
                    Name = "dasda",
                    Category = Category.Vegetables,
                    CreatedDate = DateTime.Now,
                    Description = "fgg",
                    Price = 102.40m,
                    Quantity = 0
                }
            };
        }
    }
}