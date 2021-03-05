using System;
using Core.Entities;
using Core.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Infrastructure.Data
{
    public class ShopContext : DbContext
    {
        public DbSet<Customer> Customers { get; set; }

        public DbSet<Product> Products { get; set; }

        public DbSet<Order> Orders { get; set; }
        
        public DbSet<OrderItem> OrderItems { get; set; }

        public ShopContext(DbContextOptions<ShopContext> options) : base(options) { }

        public class ApplicationContextFactory : IDesignTimeDbContextFactory<ShopContext>
        {
            public ShopContext CreateDbContext(string[] args)
            {
                var optionsBuilder = new DbContextOptionsBuilder<ShopContext>();
                optionsBuilder.EnableSensitiveDataLogging();
                optionsBuilder.UseSqlServer("Server=localhost\\SQLExpress;Database=InfopulseTT;Trusted_Connection=true;");

                return new ShopContext(optionsBuilder.Options);
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder
                .Entity<Order>()
                .Property(o => o.Status)
                .HasConversion(s => s.ToString(), s => (Status)Enum.Parse(typeof(Status), s));

            modelBuilder
                .Entity<Product>()
                .Property(o => o.Category)
                .HasConversion(s => s.ToString(), s => (Category)Enum.Parse(typeof(Category), s));

            modelBuilder
                .Entity<OrderItem>()
                .Property(o => o.ProductSize)
                .HasConversion(s => s.ToString(), s => (Size)Enum.Parse(typeof(Size), s));

            modelBuilder
                .Entity<Order>()
                .HasOne(o => o.Customer)
                .WithMany(c => c.Orders)
                .OnDelete(DeleteBehavior.Cascade);


            modelBuilder
                .Entity<OrderItem>()
                .HasOne(o => o.Order)
                .WithMany(x => x.OrderItems)
                .OnDelete(DeleteBehavior.Cascade);


            string donaldTrumpId = Guid.NewGuid().ToString();
            string josephBidenId = Guid.NewGuid().ToString();

            string cocaColaId = Guid.NewGuid().ToString();
            string milkaId = Guid.NewGuid().ToString();

            string donaldOrder = Guid.NewGuid().ToString();
            string josephOrder = Guid.NewGuid().ToString();

            modelBuilder
                .Entity<Customer>()
                .HasData(new Customer
                {
                    Id = donaldTrumpId,
                    Name = "Donald Trump",
                    Address = "775 Westminster Avenue APT D5",
                    CreatedDate = DateTime.Now

                },
                    new Customer
                    {
                        Id = josephBidenId,
                        Name = "Joseph Biden",
                        Address = "White House",
                        CreatedDate = DateTime.Now
                    });

            modelBuilder
                .Entity<Product>()
                .HasData(new Product
                {
                    Id = cocaColaId,
                    Name = "Coca-Cola",
                    Category = Category.Drinks,
                    Price = 15.0m,
                    Quantity = 50,
                },
                    new Product
                    {
                        Id = milkaId,
                        Name = "Milka",
                        Category = Category.Dessert,
                        Price = 5.0m,
                        Quantity = 10,
                        Description = "Very tasty chocolate"
                    });

            modelBuilder
                .Entity<Order>()
                .HasData(new Order
                {
                    Id = donaldOrder,
                    CreatedDate = DateTime.Now,
                    CustomerId = donaldTrumpId,
                    Status = Status.Delivered,
                    TotalCost = 50m,
                    Comment = "Some order"
                },
                    new Order
                    {
                        Id = josephOrder,
                        CreatedDate = DateTime.Now.AddDays(1),
                        CustomerId = josephBidenId,
                        Status = Status.New,
                        TotalCost = 25m,
                        Comment = "Another some order"
                    });

            modelBuilder
                .Entity<OrderItem>()
                .HasData(new OrderItem
                {
                    Id = Guid.NewGuid().ToString(),
                    Count = 3,
                    CreatedDate = DateTime.Now,
                    OrderId = donaldOrder,
                    ProductId = cocaColaId,
                    ProductSize = Size.Small
                }, new OrderItem
                {
                    Id = Guid.NewGuid().ToString(),
                    Count = 1,
                    CreatedDate = DateTime.Now,
                    OrderId = donaldOrder,
                    ProductId = milkaId,
                    ProductSize = Size.Medium
                }, new OrderItem
                {
                    Id = Guid.NewGuid().ToString(),
                    Count = 5,
                    CreatedDate = DateTime.Now,
                    OrderId = josephOrder,
                    ProductId = milkaId,
                    ProductSize = Size.Small
                });


            base.OnModelCreating(modelBuilder);
        }
    }
}
