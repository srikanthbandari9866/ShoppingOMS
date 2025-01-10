using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ShoppingOMSproject.Model.Domain
{
    public class Order
    {
        [Key]
        public int OrderId { get; set; }
        public int? UserId { get; set; }
        public  User? User { get; set; }
        public string UserName { get; set; }
        public double OrderTotal { get; set; }
        public double TotalPrice { get; set; }
        public double Discount { get; set; }
        public DateTime Date { get; set; }
        public string OrderStatus { get; set; }
        [StringLength(150)]
        public string ShippingAddress { get; set; }
        public List<OrderItem>? OrderItems { get; set; }

    }
}
