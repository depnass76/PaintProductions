using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using PaintProductions.ViewModels;
using PaintProductions.Data.Entities;


namespace PaintProductions.Data
{
  public class PaintProductionsMappingProfile : Profile
  {
    public PaintProductionsMappingProfile()
    {
      CreateMap<Order, OrderViewModel>()
        .ForMember(o => o.OrderId, ex => ex.MapFrom(i => i.Id))
        .ReverseMap();

      CreateMap<OrderItem, OrderItemViewModel>()
        .ReverseMap()
        .ForMember(m =>m.Product, opt =>opt.Ignore());
    }
  }
}
