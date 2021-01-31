using System;

namespace Application.Models.Base
{
    public class BaseModel
    {
        public string Id { get; set; }

        public DateTime? CreatedDate { get; set; }

        public BaseModel()
        {
            CreatedDate = DateTime.UtcNow;
        }
    }
}
