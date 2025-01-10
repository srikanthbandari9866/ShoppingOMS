using Microsoft.EntityFrameworkCore;
using ShoppingOMSproject.Model.Domain;

namespace ShoppingOMSproject.Repository
{
    public interface IItemRepo
    {
        Task<Item> AddItemAsync(Item item);
        Task<IEnumerable<Item>> GetAllItemAsync();
        Task<Item?> GetItemByIdAsync(int id);
        Task<List<Item>?> GetItemByCatIdAsync(int id);
        Task<Item?> UpdateItemByIdAsync(int id, Item item);
    }
}
