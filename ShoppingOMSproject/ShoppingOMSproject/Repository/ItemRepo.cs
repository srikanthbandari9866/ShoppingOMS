using Microsoft.EntityFrameworkCore;
using ShoppingOMSproject.Model.Domain;

namespace ShoppingOMSproject.Repository
{
    public class ItemRepo:IItemRepo
    {
        private readonly ShoppingOMSDBContext _dbContext;
        public ItemRepo(ShoppingOMSDBContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<Item> AddItemAsync(Item item)
        {
            await _dbContext.Item.AddAsync(item);
            await _dbContext.SaveChangesAsync();
            return item;
        }

        public async Task<IEnumerable<Item>> GetAllItemAsync()
        {
            return await _dbContext.Item.ToListAsync();
        }

        public async Task<Item?> GetItemByIdAsync(int id)
        {
            var item = await _dbContext.Item.FirstOrDefaultAsync(x => x.ItemId == id);
            if (item == null)
            {
                return null;
            }
            return item;
        }
        public async Task<List<Item>?> GetItemByCatIdAsync(int id)
        {
            return await _dbContext.Item.Where(x => x.CategoryId == id).ToListAsync();
        }

        public async Task<Item?> UpdateItemByIdAsync(int id, Item i)
        {
            var item = await _dbContext.Item.FirstOrDefaultAsync(x => x.ItemId == id);
            if (item == null)
            {
                return null;
            }
            item.ItemName = i.ItemName;
            item.IsActive = i.IsActive;
            item.Quantity = i.Quantity;
            item.Price = i.Price;
            item.Discount = i.Discount;
            if (!String.IsNullOrWhiteSpace(i.FileName) && !String.IsNullOrWhiteSpace(i.ImagePath))
            {
                item.FileName = i.FileName;
                item.ImagePath = i.ImagePath;
            }
            _dbContext.SaveChanges();
            return item;
        }
    }
}
