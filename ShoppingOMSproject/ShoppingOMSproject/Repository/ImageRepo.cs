using ShoppingOMSproject.Model.Domain;
using ShoppingOMSproject.Model.DTO;
using Microsoft.AspNetCore.Mvc;



namespace ShoppingOMSproject.Repository
{
    public class ImageRepo : IImageRepo
    {
        private readonly ShoppingOMSDBContext _context;
        private readonly IWebHostEnvironment _environment;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public ImageRepo(ShoppingOMSDBContext context, IWebHostEnvironment e, IHttpContextAccessor h)
        {
            _context = context;
            _environment = e;
            _httpContextAccessor = h;
        }
        public async Task<Image> ImageUpload(Image image)
        {
            var localFilePath = Path.Combine(_environment.ContentRootPath, "Images",
                $"{image.FileName}{image.FileExtension}");

            // Upload image to local path
            using var stream = new FileStream(localFilePath, FileMode.Create);
            await image.File.CopyToAsync(stream);

            //https://localhost:7051/images/image.jpg
            var urlFilePath = $"{_httpContextAccessor.HttpContext.Request.Scheme}://{_httpContextAccessor.HttpContext.Request.Host}{_httpContextAccessor.HttpContext.Request.PathBase}/Images/{image.FileName}{image.FileExtension}";

            image.FilePath = urlFilePath;

            //AddImage to Images Table
            //await _context.AddAsync(image);
            //await _context.SaveChangesAsync();

            return image;
        }

    }
}
