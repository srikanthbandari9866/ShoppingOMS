using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShoppingOMSproject.CustomActionFilters;
using ShoppingOMSproject.Model.Domain;
using ShoppingOMSproject.Model.DTO;
using ShoppingOMSproject.Repository;

namespace ShoppingOMSproject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShippingsController : ControllerBase
    {
        private readonly IShippingRepo _shippingRepo;
        public ShippingsController(IShippingRepo shippingRepo)
        {
            _shippingRepo = shippingRepo;
        }

        [HttpGet]
        [Route("getByUserId/{userId}")]
        public async Task<IActionResult> GetAll(int userId)
        {
            var shipping = await _shippingRepo.GetAllAddress(userId);
            return Ok(shipping);
        }
        [HttpPost]
        [Route("add")]
        //[ValidateModel]
        public async Task<IActionResult> AddShipping([FromBody]Shipping obj)
        {
            
            var shipping = await _shippingRepo.AddAddress(obj);

            return Ok(shipping);
        }

        [HttpPut]
        [Route("update/{id}")]
        public async Task<IActionResult> Delete(int id,[FromBody] Shipping obj)
        {
            var shipping = await _shippingRepo.UpdateShipping(id,obj);
            if (shipping == null)
            {
                return NotFound();
            }
            return Ok(shipping);
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            bool IsDeleted = await _shippingRepo.DeleteAddress(id);
            if (IsDeleted==false)
            {
                return NotFound();
            }
            return Ok();
        }
    }
}
