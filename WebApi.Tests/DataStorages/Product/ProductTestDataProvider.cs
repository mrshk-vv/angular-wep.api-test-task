using System;
using System.Collections.Generic;
using Core.Enums;

namespace WebApi.Tests.DataStorages.Product
{
    public class ProductTestDataProvider
    {
       
        public List<Core.Entities.Product> GetProductList()
        {
            return new List<Core.Entities.Product>
            {
                new Core.Entities.Product
                {
                    Name = "dasda",
                    Category = Category.Foods,
                    CreatedDate = DateTime.Now,
                    Description = "dasda",
                    Price = 22.40m,
                    Quantity = 22
                },
                new Core.Entities.Product
                {
                    Name = "dadasdasda",
                    Category = Category.Vegetables,
                    CreatedDate = DateTime.Now,
                    Description = "dasda",
                    Price = 52.40m,
                    Quantity = 2200
                },
                new Core.Entities.Product
                {
                    Name = "dfs",
                    Category = Category.Foods,
                    CreatedDate = DateTime.Now,
                    Description = "dasfdssdda",
                    Price = 26.40m,
                    Quantity = 220
                },
                new Core.Entities.Product
                {
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