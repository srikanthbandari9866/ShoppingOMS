using Microsoft.EntityFrameworkCore;
using ShoppingOMSproject.Model.Domain;

namespace ShoppingOMSproject.Repository
{
    public class WishlistRepo : IWishlistRepo
    {
        private readonly ShoppingOMSDBContext _dbContext;
        public WishlistRepo(ShoppingOMSDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Wishlist> AddWishlist(Wishlist item)
        {
            await _dbContext.Wishlist.AddAsync(item);
            await _dbContext.SaveChangesAsync();
            return item;
        }

        public async Task<bool> DeleteWishlist(int id)
        {
            var item = await _dbContext.Wishlist.FirstOrDefaultAsync(x=>x.WishlistId == id);
            if (item != null)
            {
                _dbContext.Wishlist.Remove(item);
                await _dbContext.SaveChangesAsync();
                return true;
            }
            return false;
        }

        public async Task<IEnumerable<Wishlist>> GetAllWishlistsByUserId(int userId)
        {
            var itemList = await _dbContext.Wishlist.Where(x=>x.UserId == userId).ToListAsync();
            return itemList;
        }
    }
}
