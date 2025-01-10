using System.ComponentModel.DataAnnotations;

namespace ShoppingOMSproject.Model.Domain
{
    public class Category
    {
        [Key]
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public List<Item>? Item { get; set; }
        public int IsActive { get; set; }

    }
}
