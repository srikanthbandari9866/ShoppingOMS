using System.ComponentModel.DataAnnotations.Schema;

namespace ShoppingOMSproject.Model.DTO
{
    public class UserDTO
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public double? Balance { get; set; }
        public string? ImagePath { get; set; }
        public string Role { get; set; }
        public int IsActive { get; set; }
    }
}
