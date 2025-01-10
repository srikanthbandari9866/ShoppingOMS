using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShoppingOMSproject.Model.Domain
{
    public class Wishlist
    {
        [Key]
        public int WishlistId { get; set; }
        public int? CategoryId { get; set; }
        public int? ItemId { get; set; }
        public int? UserId { get; set; }
        //public Category? Category { get; set; }
        public string ItemName { get; set; }
        public int Quantity { get; set; }
        public double Price { get; set; }
        public double? Discount { get; set; }
        public int IsActive { get; set; }
        public string ImagePath { get; set; }

    }
}
