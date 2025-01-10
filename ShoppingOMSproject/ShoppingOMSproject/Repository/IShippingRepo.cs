using ShoppingOMSproject.Model.Domain;

namespace ShoppingOMSproject.Repository
{
    public interface IShippingRepo
    {
        Task<List<Shipping>> GetAllAddress(int userId);
        Task<Shipping> AddAddress(Shipping shipping);
        Task<Shipping?> UpdateShipping(int id,Shipping shipping);
        Task<bool> DeleteAddress(int id);
    }
}
