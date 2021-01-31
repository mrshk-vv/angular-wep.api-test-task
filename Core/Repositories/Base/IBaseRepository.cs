using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Core.Repositories.Base
{
    public interface IBaseRepository<T> where T: class
    {
        Task<T> GetById(string id);

        Task<List<T>> GetAll();

        Task<List<T>> GetAllAsNoTracking();

        Task<T> Add(T entity);
        
        Task<T> Update(T entity);

        Task UpdateRange(List<T> entities);

        Task Remove(T entity);

    }
}
