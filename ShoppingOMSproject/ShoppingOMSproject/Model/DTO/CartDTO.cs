using ShoppingOMSproject.Model.Domain;

namespace ShoppingOMSproject.Model.DTO
{
    public class CartDTO
    {
        public int CartId { get; set; }
        public int? ItemId { get; set; }
        public int? UserId { get; set; }
        public int? CategoryId { get; set; }
        //public Category? Category { get; set; }
        //public Item? Item { get; set; }
        public string ItemName { get; set; }
        public int? Quantity { get; set; }
        public double Price { get; set; }
        public double? Discount { get; set; }
        public int IsActive { get; set; }
        public string ImagePath { get; set; }
        public int ItemCount { get; set; }
    }
}
