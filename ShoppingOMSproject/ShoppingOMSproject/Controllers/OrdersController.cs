using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShoppingOMSproject.Model.Domain;
using ShoppingOMSproject.Model.DTO;
using ShoppingOMSproject.Repository;

namespace ShoppingOMSproject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderRepo _orderRepo;
        private readonly IMapper _mapper;
        public OrdersController(IOrderRepo orderRepo, IMapper mapper)
        {
            _orderRepo = orderRepo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var orderDomain = await _orderRepo.GetAllOrder();
            return Ok(_mapper.Map<List<OrderDTO>>(orderDomain));
        }
        [HttpGet]
        [Route("getByStatus/{status}")]
        public async Task<IActionResult> GetAll(string status)
        {
            var orderDomain = await _orderRepo.GetAllOrder(status);
            return Ok(_mapper.Map<List<OrderDTO>>(orderDomain));
        }
        [HttpGet]
        [Route("getByUserId/{userId}")]
        public async Task<IActionResult> GetAllByUserId(int userId)
        {
            var orderDomain = await _orderRepo.GetAllOrdersByUserId(userId);
            return Ok(_mapper.Map<List<OrderDTO>>(orderDomain));
        }
        [HttpGet]
        [Route("getById/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var orderDomain = await _orderRepo.GetOrderById(id);
            if (orderDomain == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<OrderDTO>(orderDomain));
        }

        [HttpPost]
        [Route("add")]
        public async Task<IActionResult> AddOrder(OrderAddDTO orderAddDTO)
        {
            var orderDomain = _mapper.Map<Order>(orderAddDTO);
            orderDomain = await _orderRepo.AddOrder(orderDomain);
            var orderItems = _mapper.Map<List<OrderItem>>(orderAddDTO.OrderItems);

            if (orderAddDTO.OrderItems != null)
            {
                foreach (var orderItem in orderItems)
                {
                    orderItem.OrderId = orderDomain.OrderId;
                }
                //await _orderRepo.AddOrderItem(orderItems);
            }
            orderDomain = await _orderRepo.GetOrderById(orderDomain.OrderId);
            return Ok(_mapper.Map<OrderDTO>(orderDomain));
        }

        [HttpPut]
        [Route("update/{id}/{status}")]
        public async Task<IActionResult> Update(int id, string status)
        {
            var orderDomain = await _orderRepo.UpdateOrderStatus(id, status);
            if (orderDomain == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<OrderDTO>(orderDomain));
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var orderDomain = await _orderRepo.GetOrderById(id);
            if(orderDomain == null)
            {
                return NotFound();
            }
            var orderItems = orderDomain.OrderItems;
            if (orderItems != null)
            {
                await _orderRepo.DeleteOrderItems(orderItems.ToList());
            }
            bool IsDeleted = await _orderRepo.DeleteOrder(id);
            if (IsDeleted == false)
            {
                return NotFound();
            }
            return Ok("Deleted Successfully");
        }

    }
}
