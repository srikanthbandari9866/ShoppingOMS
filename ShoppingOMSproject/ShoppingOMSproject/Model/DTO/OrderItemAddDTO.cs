using System.ComponentModel.DataAnnotations;

namespace ShoppingOMSproject.Model.DTO
{
    public class OrderItemAddDTO
    {
        public int? OrderId { get; set; }
        public int? ItemId { get; set; }

        [StringLength(30)]
        public string ItemName { get; set; }
        public string? ImagePath { get; set; }
        public int OrderQuantity { get; set; }
        public double TotalPrice { get; set; }
        public double Discount { get; set; }
    }
}
