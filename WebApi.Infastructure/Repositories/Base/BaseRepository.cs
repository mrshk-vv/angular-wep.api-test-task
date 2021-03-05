using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities;
using Core.Repositories.Base;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories.Base
{

    public class BaseRepository<T> : IBaseRepository<T> where T : class, IBaseEntity
    {
        protected readonly ShopContext _shopContext;
        private readonly DbSet<T> _dbSet;

        public BaseRepository(ShopContext shopContext)
        {
            _shopContext = shopContext;
            _dbSet = _shopContext.Set<T>();
        }

        public async Task<T> GetById(string id)
        {
            return await _dbSet.FindAsync(id);
        }

        public async Task<List<T>> GetAll()
        {
            return await _dbSet.ToListAsync();
        }

        public async Task<List<T>> GetAllAsNoTracking()
        {
            return await _dbSet.AsNoTracking().ToListAsync();
        }

        public async Task<bool> IsExist(string id)
        {
            return await _dbSet.AnyAsync(x => x.Id == id);
        }

        public async Task<T> Add(T entity)
        {
            await _dbSet.AddAsync(entity);
            await _shopContext.SaveChangesAsync();

            return entity;
        }

        public async Task<T> Update(T entity)
        {
            _dbSet.Update(entity);
            await _shopContext.SaveChangesAsync();

            return entity;
        }

        public async Task UpdateRange(List<T> entities)
        {
            _dbSet.UpdateRange(entities);
            await _shopContext.SaveChangesAsync();
        }

        public async Task Remove(T entity)
        {
            _dbSet.Remove(entity);
            await _shopContext.SaveChangesAsync();
        }
    }
}
