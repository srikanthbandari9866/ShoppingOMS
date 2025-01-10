using Microsoft.EntityFrameworkCore;
using ShoppingOMSproject.Model.Domain;
using System.Linq;

namespace ShoppingOMSproject.Repository
{
    public class ShippingRepo:IShippingRepo
    {
        private readonly ShoppingOMSDBContext _dbContext;
        public ShippingRepo(ShoppingOMSDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Shipping> AddAddress(Shipping shipping)
        {
            await _dbContext.Shipping.AddAsync(shipping);
            await _dbContext.SaveChangesAsync();
            return shipping;
        }

        public async Task<bool> DeleteAddress(int id)
        {
            var obj = await _dbContext.Shipping.FirstOrDefaultAsync(x => x.ShippingId == id);
            if(obj == null)
            {
                return false;
            }
            _dbContext.Shipping.Remove(obj);
            await _dbContext.SaveChangesAsync();
            return true;
        }

        public async Task<List<Shipping>> GetAllAddress(int userId)
        {
            return await _dbContext.Shipping.Where(x => x.UserId == userId).ToListAsync();
        }

        public async Task<Shipping?> UpdateShipping(int id, Shipping s)
        {
            var shipping = await _dbContext.Shipping.FirstOrDefaultAsync(x=>x.ShippingId==id);
            if(shipping == null)
            {
                return null;
            }
            shipping.ShippingAddress = s.ShippingAddress;
            await _dbContext.SaveChangesAsync();
            return shipping;
        }
    }
}
