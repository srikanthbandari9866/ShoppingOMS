using ShoppingOMSproject.Model.Domain;

namespace ShoppingOMSproject.Repository
{
    public interface IOrderRepo
    {
        Task<List<Order>> GetAllOrder();
        Task<List<Order>> GetAllOrder(string status);
        Task<List<Order>> GetAllOrdersByUserId(int userId);
        Task<Order> GetOrderById(int id);
        Task<Order> AddOrder(Order order);
        Task<Order?> UpdateOrderStatus(int id, string status);
        Task<bool> DeleteOrder(int id);
        Task AddOrderItem(List<OrderItem> orderItems);
        Task DeleteOrderItems(List<OrderItem> orderItems);
    }
}
