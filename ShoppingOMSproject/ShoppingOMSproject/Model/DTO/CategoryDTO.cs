using ShoppingOMSproject.Model.Domain;

namespace ShoppingOMSproject.Model.DTO
{
    public class CategoryDTO
    {
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        //public List<Item>? Item { get; set; }
        public int IsActive { get; set; }
    }
}
