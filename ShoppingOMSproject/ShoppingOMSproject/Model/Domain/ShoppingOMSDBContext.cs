using Microsoft.EntityFrameworkCore;

namespace ShoppingOMSproject.Model.Domain
{
    public class ShoppingOMSDBContext:DbContext
    {
        public ShoppingOMSDBContext(DbContextOptions<ShoppingOMSDBContext> options): base(options)
        {
            Database.SetCommandTimeout(10000);

        }

        public DbSet<User> User { get; set; }
        public DbSet<Cart> Cart { get; set; }
        public DbSet<Category> Category { get; set; }
        public DbSet<Item> Item { get; set; }
        public DbSet<Order> Order { get; set; }
        public DbSet<OrderItem> OrderItem { get; set; }
        public DbSet<Shipping> Shipping { get; set; }
        public DbSet<Wishlist> Wishlist { get; set; }

        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    base.OnModelCreating(modelBuilder);

        //    var users = new List<User>()
        //    {
        //        new User()
        //        {
        //            UserId = 1,
        //            UserName = "Srikanth",
        //            Email = "sri@gmail.com",
        //            Password = "srikanth",
        //            Role = "Admin",
        //            PhoneNumber = "6309660211",
        //            Balance = 100000,
        //            IsActive = 1,
        //            FileName = "profile.png",
        //            ImagePath = "https://localhost:7051/Images/profile.png"

        //        },
        //        new User()
        //        {
        //            UserId = 2,
        //            UserName = "Yamini",
        //            Email = "yam@gmail.com",
        //            Password = "srikanth",
        //            Role = "User",
        //            PhoneNumber = "6309660211",
        //            Balance = 100000,
        //            IsActive = 1,
        //            FileName = "profile.png",
        //            ImagePath = "https://localhost:7051/Images/profile.png"

        //        }
        //    };
        //    modelBuilder.Entity<User>().HasData(users);
        //}
    }
}
