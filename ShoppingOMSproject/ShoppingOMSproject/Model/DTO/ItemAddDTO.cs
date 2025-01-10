using ShoppingOMSproject.Model.Domain;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShoppingOMSproject.Model.DTO
{
    public class ItemAddDTO
    {
        public int CategoryId { get; set; }
        public string ItemName { get; set; }
        public int Quantity { get; set; }
        public double Price { get; set; }
        public double? Discount { get; set; }
        public int IsActive { get; set; }
        public IFormFile? File { get; set; }
        //public string FileName { get; set; }
    }
}
