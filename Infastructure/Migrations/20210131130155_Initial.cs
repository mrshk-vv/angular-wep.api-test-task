using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Infrastructure.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Customers",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Customers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Category = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Quantity = table.Column<long>(type: "bigint", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    CustomerId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TotalCost = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Comment = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Orders_Customers_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "Customers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OrderItems",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProductId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    OrderId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    ProductSize = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Count = table.Column<long>(type: "bigint", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrderItems_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrderItems_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "Customers",
                columns: new[] { "Id", "Address", "CreatedDate", "Name" },
                values: new object[,]
                {
                    { "c7c572d8-3884-4d34-8f20-296b3a1b0daf", "775 Westminster Avenue APT D5", new DateTime(2021, 1, 31, 15, 1, 54, 977, DateTimeKind.Local).AddTicks(4791), "Donald Trump" },
                    { "7e9ddc24-e7e1-488a-bd90-3c45dfddc5ad", "White House", new DateTime(2021, 1, 31, 15, 1, 54, 982, DateTimeKind.Local).AddTicks(9028), "Joseph Biden" }
                });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "Category", "CreatedDate", "Description", "Name", "Price", "Quantity" },
                values: new object[,]
                {
                    { "83c86da3-7028-4493-ab31-a76bb4cc6548", "Drinks", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "Coca-Cola", 15.0m, 50L },
                    { "447979df-4134-4410-9c53-53c140412ee8", "Dessert", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Very tasty chocolate", "Milka", 5.0m, 10L }
                });

            migrationBuilder.InsertData(
                table: "Orders",
                columns: new[] { "Id", "Comment", "CreatedDate", "CustomerId", "Status", "TotalCost" },
                values: new object[] { "d6fe22af-5bf3-4fd3-8e8f-895b9a598984", "Some order", new DateTime(2021, 1, 31, 15, 1, 54, 986, DateTimeKind.Local).AddTicks(1985), "c7c572d8-3884-4d34-8f20-296b3a1b0daf", "Delivered", 50m });

            migrationBuilder.InsertData(
                table: "Orders",
                columns: new[] { "Id", "Comment", "CreatedDate", "CustomerId", "Status", "TotalCost" },
                values: new object[] { "41c03ee0-e2e8-4be9-9878-33033bd0968c", "Another some order", new DateTime(2021, 2, 1, 15, 1, 54, 986, DateTimeKind.Local).AddTicks(5899), "7e9ddc24-e7e1-488a-bd90-3c45dfddc5ad", "New", 25m });

            migrationBuilder.InsertData(
                table: "OrderItems",
                columns: new[] { "Id", "Count", "CreatedDate", "OrderId", "ProductId", "ProductSize" },
                values: new object[] { "d7d49e0e-0acf-48a5-8f30-9b3cc3915711", 3L, new DateTime(2021, 1, 31, 15, 1, 54, 986, DateTimeKind.Local).AddTicks(8293), "d6fe22af-5bf3-4fd3-8e8f-895b9a598984", "83c86da3-7028-4493-ab31-a76bb4cc6548", "Small" });

            migrationBuilder.InsertData(
                table: "OrderItems",
                columns: new[] { "Id", "Count", "CreatedDate", "OrderId", "ProductId", "ProductSize" },
                values: new object[] { "ec83ab4c-f0d5-4b80-aa98-42b4bd37fe13", 1L, new DateTime(2021, 1, 31, 15, 1, 54, 987, DateTimeKind.Local).AddTicks(1081), "d6fe22af-5bf3-4fd3-8e8f-895b9a598984", "447979df-4134-4410-9c53-53c140412ee8", "Medium" });

            migrationBuilder.InsertData(
                table: "OrderItems",
                columns: new[] { "Id", "Count", "CreatedDate", "OrderId", "ProductId", "ProductSize" },
                values: new object[] { "84ec47ba-443c-4f60-ac3d-5a760aae9ea3", 5L, new DateTime(2021, 1, 31, 15, 1, 54, 987, DateTimeKind.Local).AddTicks(1162), "41c03ee0-e2e8-4be9-9878-33033bd0968c", "447979df-4134-4410-9c53-53c140412ee8", "Small" });

            migrationBuilder.CreateIndex(
                name: "IX_OrderItems_OrderId",
                table: "OrderItems",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderItems_ProductId",
                table: "OrderItems",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_CustomerId",
                table: "Orders",
                column: "CustomerId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OrderItems");

            migrationBuilder.DropTable(
                name: "Orders");

            migrationBuilder.DropTable(
                name: "Products");

            migrationBuilder.DropTable(
                name: "Customers");
        }
    }
}
