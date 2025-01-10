using Microsoft.EntityFrameworkCore;
using ShoppingOMSproject.Model.Domain;

namespace ShoppingOMSproject.Repository
{
    public class CategoryRepo : ICategoryRepo
    {
        private readonly ShoppingOMSDBContext _dbContext;
        public CategoryRepo(ShoppingOMSDBContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<Category> AddCatedoryAsync(Category category)
        {
            await _dbContext.Category.AddAsync(category);
            await _dbContext.SaveChangesAsync();
            return category;
        }

        public async Task<IEnumerable<Category>> GetAllCategoryAsync()
        {
            return await _dbContext.Category.ToListAsync();
        }

        public async Task<Category?> GetCategoryByIdAsync(int id)
        {
            var category = await _dbContext.Category.FirstOrDefaultAsync(x => x.CategoryId == id);
            if (category == null)
            {
                return null;
            }
            return category;
        }

        public async Task<Category?> UpdateCategoryByIdAsync(int id, Category c)
        {
            var category = await _dbContext.Category.FirstOrDefaultAsync(x => x.CategoryId == id);
            if (category == null)
            {
                return null;
            }

            if(c.IsActive == 1 && category.IsActive == 0)
            {
                var items = await _dbContext.Item.Where(x => x.CategoryId == id).ToListAsync();
                if (items != null)
                {
                    foreach (var item in items)
                    {
                        item.IsActive = 1;
                    }
                }
                //category.Item = items;
            }
            if(category != null)
            {
                category.CategoryName = c.CategoryName;
                category.IsActive = c.IsActive;
            }

            if (c.IsActive == 0)
            {
                var items = await _dbContext.Item.Where(x => x.CategoryId == id).ToListAsync();
                if(items != null)
                {
                    foreach (var item in items)
                    {
                        item.IsActive = 0;
                    }
                }
                //category.Item = items;
            }
            
            _dbContext.SaveChanges();
            return category;
        }
    }
}
