using Microsoft.EntityFrameworkCore;
using ShoppingOMSproject.Model.Domain;
using System.Linq;

namespace ShoppingOMSproject.Repository
{
    public class OrderRepo : IOrderRepo
    {
        private readonly ShoppingOMSDBContext _dbContext;
        public OrderRepo(ShoppingOMSDBContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<Order> AddOrder(Order order)
        {
            order.OrderStatus = order.OrderStatus.ToUpper();
            var user = await _dbContext.User.FirstOrDefaultAsync(x => x.UserId == order.UserId);
            if(user != null)
            {
                user.Balance -= order.TotalPrice;
            }
            await _dbContext.Order.AddAsync(order);
            await _dbContext.SaveChangesAsync();
            return order;
        }

        public async Task AddOrderItem(List<OrderItem> orderItems)
        {
            foreach (var item in orderItems)
            {
                await _dbContext.OrderItem.AddAsync(item);
            }
            //await _dbContext.SaveChangesAsync();
        }

        public async Task<bool> DeleteOrder(int id)
        {
            var order = await _dbContext.Order.FirstOrDefaultAsync(x => x.OrderId == id);
            if (order == null)
            {
                return false;
            }
            _dbContext.Order.Remove(order);
            await _dbContext.SaveChangesAsync();
            return true;
        }

        public async Task DeleteOrderItems(List<OrderItem> orderItems)
        {
            foreach (var item in orderItems)
            {
                _dbContext.OrderItem.Remove(item);
            }
            await _dbContext.SaveChangesAsync();
        }

        public async Task<List<Order>> GetAllOrder()
        {
            var orders = await _dbContext.Order.AsQueryable().Include("OrderItems").ToListAsync();
            return orders;
        }public async Task<List<Order>> GetAllOrder(string status)
        {
            var orders = await _dbContext.Order.AsQueryable().Include("OrderItems").Where(x => x.OrderStatus == status).ToListAsync();
            return orders;
        }
        public async Task<List<Order>> GetAllOrdersByUserId(int userId)
        {
            var orders = await _dbContext.Order.AsQueryable().Include("OrderItems").Where(x => x.UserId == userId).ToListAsync();
            return orders;
        }

        public async Task<Order> GetOrderById(int id)
        {
            var order = await _dbContext.Order.AsQueryable().Include("OrderItems").Include("User").FirstOrDefaultAsync(x => x.OrderId == id);
            return order;
        }

        public async Task<Order?> UpdateOrderStatus(int id, string status)
        {
            var order = await _dbContext.Order.AsQueryable().Include("OrderItems").Include("User").FirstOrDefaultAsync(x => x.OrderId == id);
            if (order == null)
            {
                return null;
            }
            var user = await _dbContext.User.FirstOrDefaultAsync(x => x.UserId == order.UserId);
            
            if (status.ToUpper().Equals("CANCELLED") || status.ToUpper().Equals("NOT ACCEPTED"))
            {
                if (user != null)
                {
                    user.Balance += order.TotalPrice;
                }
            }

            var orderItems = order.OrderItems;
            foreach (var orderItem in orderItems)
            {
                var item = await _dbContext.Item.FirstOrDefaultAsync(x => x.ItemId == orderItem.ItemId);
                if (item != null)
                {
                    if (status.ToUpper().Equals("CANCELLED") || status.ToUpper().Equals("NOT ACCEPTED"))
                    {
                        item.Quantity += orderItem.OrderQuantity;
                    }
                    else
                    {
                        item.Quantity -= orderItem.OrderQuantity;
                    }
                }
            }
            order.OrderStatus = status.ToUpper();
            //_dbContext.Entry(order).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
            return order;
        }
    }
}
