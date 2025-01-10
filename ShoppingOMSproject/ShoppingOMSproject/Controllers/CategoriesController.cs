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
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryRepo _categoryRepo;
        private readonly IMapper _mapper;
        public CategoriesController(ICategoryRepo categoryRepo, IMapper mapper)
        {
            _categoryRepo = categoryRepo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var categoryDomain = await _categoryRepo.GetAllCategoryAsync();
            return Ok(_mapper.Map<List<CategoryDTO>>(categoryDomain));
        }
        [HttpGet]
        [Route("getById/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var catDomain = await _categoryRepo.GetCategoryByIdAsync(id);
            if (catDomain == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<CategoryDTO>(catDomain));
        }

        [HttpPost]
        [Route("add")]
        public async Task<IActionResult> AddCategory(CategoryAddDTO categoryAddDTO)
        {
            var categoryDomain = _mapper.Map<Category>(categoryAddDTO);
            categoryDomain = await _categoryRepo.AddCatedoryAsync(categoryDomain);

            return Ok(_mapper.Map<CategoryDTO>(categoryDomain));
        }
        [HttpPut]
        [Route("update/{id}")]
        public async Task<IActionResult> Update(int id, CategoryAddDTO catDTO)
        {
            var categoryDomain = _mapper.Map<Category>(catDTO);
            categoryDomain = await _categoryRepo.UpdateCategoryByIdAsync(id,categoryDomain);
            if (categoryDomain == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<CategoryDTO>(categoryDomain));
        }


    }
}
