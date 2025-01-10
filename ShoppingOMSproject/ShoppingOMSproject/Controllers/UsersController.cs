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
    public class UsersController : ControllerBase
    {
        private readonly IUserRepo _userRepo;
        private readonly IMapper _mapper;
        private readonly IImageRepo _imageRepo;
        private readonly ILogger<UsersController> _logger;
        public UsersController(IUserRepo userRepo, IMapper mapper, IImageRepo imageRepo, ILogger<UsersController> logger)
        {
            _userRepo = userRepo;
            _mapper = mapper;
            _imageRepo = imageRepo;
            _logger = logger;
        }

        [HttpGet]
        //[Authorize(Roles ="Admin")]
        [Authorize]
        public async Task<IActionResult> GetAll()
        {
            _logger.LogError("Get All Users Started....");
            var userDomain = await _userRepo.GetAllUsersAsync();
            _logger.LogError("Get All Users Ended....");
            return Ok(_mapper.Map<List<UserDTO>>(userDomain));
        }
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> RegisterUser([FromForm] RegisterUserDTO userDTO)
        {
            var userDomain = _mapper.Map<User>(userDTO);
            bool emailExists = await _userRepo.VerifyEmaiAsync(userDomain);
            if ((emailExists==true))
            {
                return BadRequest("Email is already Exists. Please try with other Email address");
            }
            userDomain = await _userRepo.RegisterUserAsync(userDomain);
            return Ok(_mapper.Map<UserDTO>(userDomain));
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> LoginUser([FromBody]UserLoginDTO userdto)
        {
            var userDomain = _mapper.Map<User>(userdto);
            userDomain = await _userRepo.LoginUserAsync(userDomain);
            if (userDomain == null)
            {
                return Unauthorized("Invalid Credentials...");
            }
            var token = _userRepo.CreateTokenAsync(userDomain);
            var result = new
            {
                token = token,
                user = _mapper.Map<UserDTO>(userDomain)
            };

            return Ok(result);
        }

        [HttpGet]
        [Route("userById/{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            var userDomain = await _userRepo.GetUserByIdAsync(id);
            if (userDomain == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<UserDTO>(userDomain));
        }
        [HttpPut]
        [Route("forgetPassword")]
        public async Task<IActionResult> ForgetPassword([FromBody]UserLoginDTO loginDto)
        {
            var userDomain = _mapper.Map<User>(loginDto);
            bool emailExists = await _userRepo.VerifyEmaiAsync(userDomain);
            if (emailExists == false)
            {
                return NotFound("Email is not correct. Please enter a correct email address");
            }
            userDomain = await _userRepo.ForgetPasswordAsync(userDomain);

            return Ok(_mapper.Map<UserDTO>(userDomain));
        }
        [HttpPut]
        [Route("changePassword")]
        public async Task<IActionResult> ForgetPassword(UserChangePasswordDTO userDto)
        {
            var userDomain = new User
            {
                Email = userDto.Email,
                Password = userDto.NewPassword
            };
            bool emailExists = await _userRepo.VerifyEmaiAsync(userDomain);
            if (emailExists == false)
            {
                return NotFound("Email is not correct. Please enter a correct email address");
            }
            userDomain = await _userRepo.ChangePasswordAsync(userDto.OldPassword,userDomain);
            if (userDomain == null)
            {
                return NotFound("wrong current password...");
            }

            return Ok(_mapper.Map<UserDTO>(userDomain));
        }
        [HttpPut]
        [Route("changeImage/{id}")]
        public async Task<IActionResult> ChangeUserImage(int id, [FromForm]UserImageChangeDTO userDto)
        {
            ValidateFileUpload(userDto);
            if(ModelState.IsValid)
            {
                var userDomain = _mapper.Map<User>(userDto);
                var image = new Image
                {
                    File = userDto.File,
                    FileName = userDto.File.FileName,
                    FileExtension = Path.GetExtension(userDto.File.FileName),
                    FileSizeInBytes = userDto.File.Length
                };
                image = await _imageRepo.ImageUpload(image);

                userDomain.ImagePath = image.FilePath;
                userDomain = await _userRepo.ChangeImageAsync(id, userDomain);

                return Ok(_mapper.Map<UserDTO>(userDomain));
            }
            return BadRequest(ModelState);
        }

        private void ValidateFileUpload(UserImageChangeDTO itemDto)
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
