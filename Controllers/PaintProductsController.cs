using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PaintProductions.Data;
using PaintProductions.Data.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace PaintProductions.Controllers
{
  [Route("api/[Controller]")]
  [ApiController]
  [Produces("application/json")]
  public class PaintProductsController : ControllerBase
  {
    private readonly IPaintProductionsRepository _repository;
    private readonly ILogger<PaintProductsController> _logger;

    public PaintProductsController(IPaintProductionsRepository repository, ILogger<PaintProductsController> logger)
    {
      _repository = repository;
      _logger = logger;
    }

    [HttpGet]
    [ProducesResponseType(200)]
    [ProducesResponseType(400)]
    public ActionResult<IEnumerable<Product>> Get()
    {
      try
      {
        return Ok(_repository.GetAllProducts()); 
      }
      catch (Exception ex)
      {
        _logger.LogError($"Failed to get products: {ex}");
        return BadRequest("failed to get products");
      }
    }
  }
}
