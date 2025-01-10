using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShoppingOMSproject.Model.DTO
{
    public class Image
    {
        public IFormFile File { get; set; }
        public string? FileName { get; set; }
        public string? FileExtension { get; set; }
        public long? FileSizeInBytes { get; set; }
        public string? FilePath { get; set; }

    }
}
