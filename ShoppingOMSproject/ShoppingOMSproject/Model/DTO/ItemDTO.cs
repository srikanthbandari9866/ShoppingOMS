using ShoppingOMSproject.Model.Domain;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShoppingOMSproject.Model.DTO
{
    public class ItemDTO
    {
        public int ItemId { get; set; }
        public int? CategoryId { get; set; }
        public Category? Category { get; set; }
        public string ItemName { get; set; }
        public int Quantity { get; set; }
        public double Price { get; set; }
        public double? Discount { get; set; }
        public int IsActive { get; set; }
        public string FileName { get; set; }
        public string ImagePath { get; set; }
    }
}
