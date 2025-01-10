using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShoppingOMSproject.Model.Domain;
using ShoppingOMSproject.Model.DTO;
using ShoppingOMSproject.Repository;
//using static System.Net.Mime.MediaTypeNames;
//using Image = ShoppingOMSproject.Model.DTO.Image;

namespace ShoppingOMSproject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ItemsController : ControllerBase
    {
        private readonly IItemRepo _itemRepo;
        private readonly IImageRepo _imageRepo;
        private readonly IMapper _mapper;
        public ItemsController(IItemRepo itemRepo,IImageRepo imageRepo, IMapper mapper)
        {
            _itemRepo = itemRepo;
            _imageRepo = imageRepo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var itemDomain = await _itemRepo.GetAllItemAsync();
            return Ok(_mapper.Map<List<ItemDTO>>(itemDomain));
        }

        [HttpGet]
        [Route("getById/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var itemDomain = await _itemRepo.GetItemByIdAsync(id);
            if (itemDomain == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<CategoryDTO>(itemDomain));
        }

        [HttpPost]
        [Route("add")]
        public async Task<IActionResult> AddItem([FromForm] ItemAddDTO itemDto)
        {

            if (itemDto.File != null)
            {
                ValidateFileUpload(_mapper.Map<ItemAddDTO>(itemDto));
            }
            if (ModelState.IsValid)
            {
                var itemDomain = _mapper.Map<Item>(itemDto);

                if (itemDto.File != null)
                {
                    var image = new Image
                    {
                        File = itemDto.File,
                        FileName = itemDto.File.FileName,
                        FileExtension = Path.GetExtension(itemDto.File.FileName),
                        FileSizeInBytes = itemDto.File.Length
                    };
                    image = await _imageRepo.ImageUpload(image);

                    itemDomain.ImagePath = image.FilePath;
                    itemDomain.FileName = image.FileName;
                }

                itemDomain.ImagePath = "https://localhost:7051/Images/defaultitem.jpg.jpg";
                itemDomain.FileName = "defaultitem.jpg";

                itemDomain = await _itemRepo.AddItemAsync(itemDomain);


                return Ok(_mapper.Map<ItemDTO>(itemDomain));
            }
            return BadRequest(ModelState);
        }

        [HttpPut]
        [Route("update/{id}")]
        public async Task<IActionResult> UpdateItem(int id,[FromForm] ItemUpdateDTO itemDto)
        {
            if (itemDto.File != null)
            {
                ValidateFileUpload(_mapper.Map<ItemAddDTO>(itemDto));
            }
            if (ModelState.IsValid)
            {
                var itemDomain = _mapper.Map<Item>(itemDto);

                if(itemDto.File != null)
                {
                    var image = new Image
                    {
                        File = itemDto.File,
                        FileName = itemDto.File.FileName,
                        FileExtension = Path.GetExtension(itemDto.File.FileName),
                        FileSizeInBytes = itemDto.File.Length
                    };
                    image = await _imageRepo.ImageUpload(image);

                    itemDomain.ImagePath = image.FilePath;
                    itemDomain.FileName = image.FileName;
                }

                itemDomain = await _itemRepo.UpdateItemByIdAsync(id,itemDomain);

                if (itemDomain == null)
                {
                    return NotFound();
                }


                return Ok(_mapper.Map<ItemDTO>(itemDomain));
            }
            return BadRequest(ModelState);
        }


        private void ValidateFileUpload(ItemAddDTO itemDto)
        {
            var allowedExtensions = new string[] { ".jpg", ".jpeg", ".png", ".svg" };
            //var allowedExtensions = new string[] { ".jpg", ".jpeg", ".png", ".svg", ".pdf" };

            if (!allowedExtensions.Contains(Path.GetExtension(itemDto.File.FileName)))
            {
                ModelState.AddModelError("File", "File extension not supported, allowed: .jpg, .jpeg, .png, .svg ");
            }
            if (itemDto.File.Length > 10485760)
            {
                ModelState.AddModelError("File", "File size could not exceed the 10Mb");
            }
        }
    }
}
