using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShoppingOMSproject.Migrations
{
    /// <inheritdoc />
    public partial class removedsomefields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cart_Category_CategoryId",
                table: "Cart");

            migrationBuilder.DropForeignKey(
                name: "FK_Cart_Item_ItemId",
                table: "Cart");

            migrationBuilder.DropForeignKey(
                name: "FK_OrderItem_Item_ItemId",
                table: "OrderItem");

            migrationBuilder.DropForeignKey(
                name: "FK_Wishlist_Category_CategoryId",
                table: "Wishlist");

            migrationBuilder.DropIndex(
                name: "IX_Wishlist_CategoryId",
                table: "Wishlist");

            migrationBuilder.DropIndex(
                name: "IX_OrderItem_ItemId",
                table: "OrderItem");

            migrationBuilder.DropIndex(
                name: "IX_Cart_CategoryId",
                table: "Cart");

            migrationBuilder.DropIndex(
                name: "IX_Cart_ItemId",
                table: "Cart");

            migrationBuilder.AlterColumn<string>(
                name: "ShippingAddress",
                table: "Shipping",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "ShippingAddress",
                table: "Shipping",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Wishlist_CategoryId",
                table: "Wishlist",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderItem_ItemId",
                table: "OrderItem",
                column: "ItemId");

            migrationBuilder.CreateIndex(
                name: "IX_Cart_CategoryId",
                table: "Cart",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Cart_ItemId",
                table: "Cart",
                column: "ItemId");

            migrationBuilder.AddForeignKey(
                name: "FK_Cart_Category_CategoryId",
                table: "Cart",
                column: "CategoryId",
                principalTable: "Category",
                principalColumn: "CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Cart_Item_ItemId",
                table: "Cart",
                column: "ItemId",
                principalTable: "Item",
                principalColumn: "ItemId");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderItem_Item_ItemId",
                table: "OrderItem",
                column: "ItemId",
                principalTable: "Item",
                principalColumn: "ItemId");

            migrationBuilder.AddForeignKey(
                name: "FK_Wishlist_Category_CategoryId",
                table: "Wishlist",
                column: "CategoryId",
                principalTable: "Category",
                principalColumn: "CategoryId");
        }
    }
}
