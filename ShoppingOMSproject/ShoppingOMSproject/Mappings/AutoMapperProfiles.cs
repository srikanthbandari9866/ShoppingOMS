using AutoMapper;
using ShoppingOMSproject.Model.Domain;
using ShoppingOMSproject.Model.DTO;


namespace ShoppingOMSproject.Mappings
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User,RegisterUserDTO>().ReverseMap();
            CreateMap<User,UserDTO>().ReverseMap();
            CreateMap<User,UserLoginDTO>().ReverseMap();
            CreateMap<User,UserImageChangeDTO>().ReverseMap();
            CreateMap<Category,CategoryDTO>().ReverseMap();
            CreateMap<Category,CategoryAddDTO>().ReverseMap();
            CreateMap<Item,ItemDTO>().ReverseMap();
            CreateMap<Item,ItemAddDTO>().ReverseMap();
            CreateMap<ItemUpdateDTO,ItemAddDTO>().ReverseMap();
            CreateMap<Item,ItemUpdateDTO>().ReverseMap();
            CreateMap<Item, Wishlist>();
            CreateMap<Wishlist,WishlistDTO>().ReverseMap();
            CreateMap<Cart,CartDTO>().ReverseMap();
            CreateMap<Order,OrderDTO>().ReverseMap();
            CreateMap<Order,OrderAddDTO>().ReverseMap();
            CreateMap<OrderItem,OrderItemAddDTO>().ReverseMap();

        }
    }
}
