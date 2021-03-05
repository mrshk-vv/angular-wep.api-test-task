using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities
{
    public interface IBaseEntity
    {
        public string Id { get; set; }

        public DateTime CreatedDate { get; set; }
    }
}