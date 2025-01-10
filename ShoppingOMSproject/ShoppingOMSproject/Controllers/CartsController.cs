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
    public class CartsController : ControllerBase
    {
        private readonly IItemRepo _itemRepo;
        private readonly ICartRepo _cartRepo;
        private readonly IMapper _mapper;
        public CartsController(IItemRepo itemRepo, ICartRepo cartRepo, IMapper mapper)
        {
            _itemRepo = itemRepo;
            _cartRepo = cartRepo;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("getByUserId/{userId}")]
        public async Task<IActionResult> GetAllByUserId(int userId)
        {
            var listDomain = await _cartRepo.GetAllCartsByUserId(userId);
            return Ok(_mapper.Map<List<CartDTO>>(listDomain));
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            bool isDeleted = await _cartRepo.DeleteCart(id);
            if (isDeleted == false)
            {
                return NotFound();
            }
            return Ok();
        }

        [HttpPost]
        [Route("add/{itemId}/{userId}")]
        public async Task<IActionResult> AddWishlist(int itemId, int userId)
        {
            var item = await _itemRepo.GetItemByIdAsync(itemId);
            if (item == null)
            {
                return NotFound();
            }
            var cart = new Cart()
            {
                CategoryId = item.CategoryId,
                ItemId = itemId,
                UserId = userId,
                ItemName = item.ItemName,
                Quantity = item.Quantity,
                Discount = item.Discount,
                Price = item.Price,
                ItemCount = 1,
                IsActive = item.IsActive,
                ImagePath = item.ImagePath
            };
            cart = await _cartRepo.AddCart(cart);
            return Ok(_mapper.Map<CartDTO>(cart));

        }
        [HttpPut]
        [Route("updateItemCount/{cartId}/{count}")]
        public async Task<IActionResult> UpateItemCount(int cartId,int count)
        {
            var item = await _cartRepo.UpdateCartItemCount(cartId,count);
            if (item == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<CartDTO>(item));
        }
    }
}
