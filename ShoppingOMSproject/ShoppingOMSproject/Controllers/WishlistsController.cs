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
    public class WishlistsController : ControllerBase
    {
        private readonly IItemRepo _itemRepo;
        private readonly IWishlistRepo _wishListRepo;
        private readonly IMapper _mapper;
        public WishlistsController(IItemRepo itemRepo, IWishlistRepo wishListRepo, IMapper mapper)
        {
            _itemRepo = itemRepo;
            _wishListRepo = wishListRepo;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("getByUserId/{userId}")]
        public async Task<IActionResult> GetAllByUserId(int userId)
        {
            var listDomain = await _wishListRepo.GetAllWishlistsByUserId(userId);
            return Ok(_mapper.Map<List<WishlistDTO>>(listDomain));
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            bool isDeleted = await _wishListRepo.DeleteWishlist(id);
            if (isDeleted==false)
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
            if(item == null)
            {
                return NotFound();
            }
            //object wishlistItem = _mapper.Map<Item>(item);
            //Wishlist wishlist = new Wishlist();
            //if (wishlistItem != null)
            //{
            //    wishlist = wishlistItem as Wishlist;
            //    wishlist.UserId = userId;
            //}
            var wishlist = new Wishlist()
            {
                CategoryId = item.CategoryId,
                ItemId = itemId,
                UserId = userId,
                ItemName = item.ItemName,
                Quantity = item.Quantity,
                Discount = item.Discount,
                Price = item.Price,
                IsActive = item.IsActive,
                ImagePath = item.ImagePath
            };
            wishlist = await _wishListRepo.AddWishlist(wishlist);
            return Ok(_mapper.Map<WishlistDTO>(wishlist));
            
        }
    }
}
