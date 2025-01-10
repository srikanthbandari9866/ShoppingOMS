using ShoppingOMSproject.Model.Domain;

namespace ShoppingOMSproject.Repository
{
    public interface ICategoryRepo
    {
        Task<Category> AddCatedoryAsync(Category category);
        Task<IEnumerable<Category>> GetAllCategoryAsync();
        Task<Category?> GetCategoryByIdAsync(int id);
        Task<Category?> UpdateCategoryByIdAsync(int id, Category category);
    }
}
