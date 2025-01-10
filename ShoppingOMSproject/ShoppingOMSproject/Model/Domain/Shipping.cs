using System.ComponentModel.DataAnnotations;

namespace ShoppingOMSproject.Model.Domain
{
    public class Shipping
    {
        [Key]
        public int ShippingId { get; set; }
        public int? UserId { get; set; }
        [Required(ErrorMessage ="Shipping address is required")]
        public string? ShippingAddress { get; set; }

    }
}
