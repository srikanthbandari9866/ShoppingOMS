using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ShoppingOMSproject.Model.Domain
{
    public class OrderItem
    {
        [Key]
        public int OrderItemId { get; set; }
        [ForeignKey("OrderId")]
        public int? OrderId { get; set; }
        //public  Order? Order { get; set; }
        public int? ItemId { get; set; }
        //public  Item? Item { get; set; }
        [StringLength(30)]
        public string ItemName { get; set; }
        public string? ImagePath { get; set; }
        public int OrderQuantity { get; set; }
        public double TotalPrice { get; set; }
        public double Discount { get; set; }

    }
}
