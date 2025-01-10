using ShoppingOMSproject.Model.Domain;
using System.Collections.Generic;

namespace ShoppingOMSproject.Repository
{
    public interface IWishlistRepo
    {
        Task<Wishlist> AddWishlist(Wishlist wishlist);
        Task<IEnumerable<Wishlist>> GetAllWishlistsByUserId(int userId);
        Task<bool> DeleteWishlist(int id);
    }
}
