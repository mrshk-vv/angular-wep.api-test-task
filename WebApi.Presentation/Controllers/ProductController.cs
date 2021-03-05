using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Application.Exceptions;
using Application.Interfaces;
using Application.Models.Product;

namespace Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;
        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet("GetProducts")]
        public async Task<IActionResult> Get()
        {
            return Ok(await _productService.GetProductsAsync());
        }

        [HttpGet("GetAvailableProducts")]
        public async Task<IActionResult> GetAvailableProducts()
        {
            return Ok(await _productService.GetAvailableProducts());
        }

        [HttpGet("GetProduct/{id}")]
        public async Task<IActionResult> Get(string id)
        {
            return Ok(await _productService.GetProductByIdAsync(id));
        }


        [HttpPost("AddProduct")]
        public async Task<IActionResult> Post([FromBody] ProductModel product)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _productService.AddProductAsync(product));
            }

            return BadRequest("Invalid product info");
        }

        [HttpPut("UpdateProduct/{id}")]
        public async Task<IActionResult> Put(string id, [FromBody] ProductModel product)
        {
            if (!id.Equals(product.Id))
            {
                return BadRequest("Error");
            }

            if (ModelState.IsValid)
            {
                return Ok(await _productService.UpdateProductAsync(product));
            }

            return BadRequest("Invalid product data");
        }

        [HttpDelete("RemoveProduct/{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            try
            {
                await _productService.RemoveProductAsync(id);
                return Ok();
            }
            catch (ApplicationException e)
            {
                return NotFound(e.Message);
            }
        }
    }
}
