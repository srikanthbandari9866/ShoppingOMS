

using ShoppingOMSproject.Model.DTO;

namespace ShoppingOMSproject.Repository
{
    public interface IImageRepo
    {
        Task<Image> ImageUpload(Image image);
    }
}
