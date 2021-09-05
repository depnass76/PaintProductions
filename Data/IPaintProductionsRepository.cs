using System.Collections.Generic;
using PaintProductions.Data.Entities;

namespace PaintProductions.Data
{
  public interface IPaintProductionsRepository
  {
    IEnumerable<Product> GetAllProducts(); 
    IEnumerable<Order> GetAllOrders(bool includeItems);

    IEnumerable<Order> GetAllOrdersByUser(string username,bool includeItems);

    Order GetOrderById(string username, int id);

    IEnumerable<Product> GetProductsByCategory(string category);
    void AddEntity(object entity);
    bool SaveAll();
  }
}