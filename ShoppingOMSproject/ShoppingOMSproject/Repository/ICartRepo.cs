using ShoppingOMSproject.Model.Domain;

namespace ShoppingOMSproject.Repository
{
    public interface ICartRepo
    {
        Task<Cart> AddCart(Cart cart);
        Task<IEnumerable<Cart>> GetAllCartsByUserId(int userId);
        Task<bool> DeleteCart(int id);
        Task<Cart?> UpdateCartItemCount(int id,int count);
    }
}
