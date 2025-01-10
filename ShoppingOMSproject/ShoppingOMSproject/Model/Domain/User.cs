using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShoppingOMSproject.Model.Domain
{
    public class User
    {
        [Key]
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public double? Balance { get; set; }
        [NotMapped]
        public IFormFile? File { get; set; }
        public string? FileName { get; set; }
        public string? ImagePath { get; set; }
        public string Role { get; set; }
        public int IsActive { get; set; }

    }
}
