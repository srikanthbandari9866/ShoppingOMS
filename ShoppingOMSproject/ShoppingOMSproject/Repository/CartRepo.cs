using Microsoft.EntityFrameworkCore;
using ShoppingOMSproject.Model.Domain;

namespace ShoppingOMSproject.Repository
{
    public class CartRepo:ICartRepo
    {
        private readonly ShoppingOMSDBContext _dbContext;
        public CartRepo(ShoppingOMSDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Cart> AddCart(Cart item)
        {
            await _dbContext.Cart.AddAsync(item);
            await _dbContext.SaveChangesAsync();
            return item;
        }

        public async Task<bool> DeleteCart(int id)
        {
            var item = await _dbContext.Cart.FirstOrDefaultAsync(x => x.CartId == id);
            if (item != null)
            {
                _dbContext.Cart.Remove(item);
                await _dbContext.SaveChangesAsync();
                return true;
            }
            return false;
        }

        public async Task<IEnumerable<Cart>> GetAllCartsByUserId(int userId)
        {
            var itemList = await _dbContext.Cart.Where(x => x.UserId == userId).ToListAsync();
            return itemList;
        }

        public async Task<Cart?> UpdateCartItemCount(int id, int count)
        {
            var item = await _dbContext.Cart.FirstOrDefaultAsync(x => x.CartId == id);
            if (item == null)
            {
                return null;
            }
            item.ItemCount = count;
            return item;
        }
    }
}
