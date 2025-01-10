using ShoppingOMSproject.Model.Domain;

namespace ShoppingOMSproject.Repository
{
    public interface IUserRepo
    {
        Task<User> RegisterUserAsync(User user);
        Task<bool> VerifyEmaiAsync(User user);
        Task<User?> LoginUserAsync(User user);
        Task<IEnumerable<User>> GetAllUsersAsync();
        Task<User?> GetUserByIdAsync(int id);
        Task<User> UpdateUserAsync(int id,User user);
        Task DeleteUserAsync(int id);
        Task<User?> ForgetPasswordAsync(User user);
        Task<User?> ChangePasswordAsync(string oldPassword, User user);
        string CreateTokenAsync(User user);
        Task<User?> ChangeImageAsync(int id, User user);
    }
}
