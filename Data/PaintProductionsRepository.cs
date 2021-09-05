using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PaintProductions.Data.Entities;
using Microsoft.Extensions.Logging;
using PaintProductions.Data;
using Microsoft.EntityFrameworkCore;

namespace PaintProductions.Data
{
    public class PaintProductionsRepository : IPaintProductionsRepository
    {
        private readonly PaintProductionsContext _ctx;
        private readonly ILogger<PaintProductionsRepository> _logger;

        public PaintProductionsRepository(PaintProductionsContext ctx, ILogger<PaintProductionsRepository> logger)
        {
            _ctx = ctx;
            _logger = logger;
        }

        public IEnumerable<Product> GetAllProducts()
        {
            try
            {
                _logger.LogInformation("GetAllProducts was called...");

                return _ctx.Products
                           .OrderBy(p => p.Title)
                           .ToList();

            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get all products: {ex}");
                return null;
            }
        }

        public IEnumerable<Order> GetAllOrders(bool includeItems)
        {
            if (includeItems)
            {
                return _ctx.Orders
                  .Include(o => o.Items)
                  .ThenInclude(i => i.Product)
                  .ToList();
            }
            else
            {
                return _ctx.Orders
                  .ToList();
            }
        }

        public Order GetOrderById(string username, int id)
        {
            return _ctx.Orders
              .Include(o => o.Items)
              .ThenInclude(i => i.Product)
              .Where(o => o.Id == id && o.User.UserName == username)
              .FirstOrDefault();
        }

        public IEnumerable<Product> GetProductsByCategory(string category)
        {
            return _ctx.Products
                       .Where(p => p.Category == category)
                       .ToList();
        }

        public bool SaveAll()
        {
            return _ctx.SaveChanges() > 0;
        }

        public void AddEntity(object entity)
        {
            _ctx.Add(entity);
        }

        public IEnumerable<Order> GetAllOrdersByUser(string username, bool includeItems)
        {
            if (includeItems)
            {
                return _ctx.Orders
                  .Include(o => o.Items)
                  .ThenInclude(i => i.Product)
                  .Where(o => o.User.UserName == username)
                  .ToList();
            }
            else
            {
                return _ctx.Orders
                  .Where(o => o.User.UserName == username)
                  .ToList();
            }
        }

       
    }
}
