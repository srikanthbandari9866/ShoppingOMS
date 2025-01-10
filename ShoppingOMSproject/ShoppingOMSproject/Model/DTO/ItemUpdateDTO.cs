using System.ComponentModel.DataAnnotations;

namespace ShoppingOMSproject.Model.DTO
{
    public class ItemUpdateDTO
    {
        public int? CategoryId { get; set; }
        public string? ItemName { get; set; }
        public int? Quantity { get; set; }
        public double? Price { get; set; }
        public double? Discount { get; set; }
        public int? IsActive { get; set; }
        public IFormFile? File { get; set; }
    }
}
