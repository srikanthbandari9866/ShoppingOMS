using ShoppingOMSproject.Model.Domain;

namespace ShoppingOMSproject.Model.DTO
{
    public class WishlistDTO
    {
        public int WishlistId { get; set; }
        public int? CategoryId { get; set; }
        public int? ItemId { get; set; }
        public int? UserId { get; set; }
        //public Category? Category { get; set; }
        public string ItemName { get; set; }
        public int Quantity { get; set; }
        public double? Discount { get; set; }
        public double Price { get; set; }
        public int IsActive { get; set; }
        public string ImagePath { get; set; }
    }
}
