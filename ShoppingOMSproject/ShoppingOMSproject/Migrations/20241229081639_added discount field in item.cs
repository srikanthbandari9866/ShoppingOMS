using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ShoppingOMSproject.Migrations
{
    /// <inheritdoc />
    public partial class addeddiscountfieldinitem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "User",
                keyColumn: "UserId",
                keyValue: 2);

            migrationBuilder.AddColumn<double>(
                name: "Discount",
                table: "Wishlist",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Discount",
                table: "Item",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Discount",
                table: "Cart",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Discount",
                table: "Wishlist");

            migrationBuilder.DropColumn(
                name: "Discount",
                table: "Item");

            migrationBuilder.DropColumn(
                name: "Discount",
                table: "Cart");

            migrationBuilder.InsertData(
                table: "User",
                columns: new[] { "UserId", "Balance", "Email", "FileName", "ImagePath", "IsActive", "Password", "PhoneNumber", "Role", "UserName" },
                values: new object[,]
                {
                    { 1, 100000.0, "sri@gmail.com", "profile.png", "https://localhost:7051/Images/profile.png", 1, "srikanth", "6309660211", "Admin", "Srikanth" },
                    { 2, 100000.0, "yam@gmail.com", "profile.png", "https://localhost:7051/Images/profile.png", 1, "srikanth", "6309660211", "User", "Yamini" }
                });
        }
    }
}
