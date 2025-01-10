using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using ShoppingOMSproject.Model.Domain;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ShoppingOMSproject.Repository
{
    public class UserRepo : IUserRepo
    {
        private readonly ShoppingOMSDBContext _context;
        private readonly IConfiguration _configuration;
        public UserRepo(ShoppingOMSDBContext context, IConfiguration configuration) 
        {
            _context = context;
            _configuration = configuration;
        }

        public async Task<User?> ForgetPasswordAsync(User u)
        {
            var user = await _context.User.FirstOrDefaultAsync(x => x.Email == u.Email);
            
            if (user != null)
            {
                user.Password = BCrypt.Net.BCrypt.HashPassword(u.Password);
                //_context.Entry(user).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                await _context.SaveChangesAsync();
            }
            return user;
        }
        public async Task<User?> ChangePasswordAsync(string oldPassword, User u)
        {
            var user = await _context.User.FirstOrDefaultAsync(x => x.Email == u.Email);
            if (user != null)
            {
                if (!BCrypt.Net.BCrypt.Verify(oldPassword, user.Password))
                {
                    return null;
                }
                user.Password = BCrypt.Net.BCrypt.HashPassword(u.Password);
                //_context.Entry(user).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                await _context.SaveChangesAsync();
            }
            return user;
        }

        public Task DeleteUserAsync(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            return await _context.User.ToListAsync();
        }

        public async Task<User?> GetUserByIdAsync(int id)
        {
            var user = await _context.User.FirstOrDefaultAsync(x => x.UserId == id);
            if (user == null)
            {
                return null;
            }
            return user;
        }

        public async Task<User?> LoginUserAsync(User u)
        {
            User? user = await _context.User.FirstOrDefaultAsync(x => x.Email == u.Email);
            if(user != null)
            {
                if (BCrypt.Net.BCrypt.Verify(u.Password, user.Password))
                {
                    return user;
                }
            }
            return null;
        }

        public async Task<User> RegisterUserAsync(User u)
        {
            
            var user = new User
            {
                UserName = u.UserName,
                PhoneNumber = u.PhoneNumber,
                Email = u.Email,
                Balance = u.Balance,
                FileName = "profile.png",
                Role = u.Role,
                IsActive = u.IsActive,
                ImagePath = "https://localhost:7051/Images/profile.png",
                Password = BCrypt.Net.BCrypt.HashPassword(u.Password)
            };

            await _context.User.AddAsync(user);
            await _context.SaveChangesAsync();

            return user;
        }

        public Task<User> UpdateUserAsync(int id, User user)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> VerifyEmaiAsync(User user)
        {
            var checkUser = await _context.User.FirstOrDefaultAsync(x => x.Email.Equals(user.Email));
            return checkUser == null?false: true;
        }

        public string CreateTokenAsync(User user)
        {
            var claims = new List<Claim>();

            claims.Add(new Claim(ClaimTypes.Name, user.UserName));
            claims.Add(new Claim(ClaimTypes.Email, user.Email));
            claims.Add(new Claim(ClaimTypes.Role, user.Role));

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Secret"]));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                _configuration["Jwt:ValidAudience"],
                _configuration["Jwt:ValidIssuer"],
                claims,
                expires: DateTime.UtcNow.AddMinutes(30),
                //expires: DateTime.UtcNow.AddMinutes(1),
                //expires: DateTime.Now.AddHours(1),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);

        }

        public async Task<User?> ChangeImageAsync(int id, User u)
        {
            var user = await _context.User.FirstOrDefaultAsync(x => x.UserId==id);
            if (user == null)
            {
                return null;
            }
            user.ImagePath = u.ImagePath;
            _context.SaveChanges();
            return user;
        }
    }
}
