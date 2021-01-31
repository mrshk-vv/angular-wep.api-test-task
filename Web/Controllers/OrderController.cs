using System;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Interfaces;
using Application.Models.Order;
using ApplicationException = Application.Exceptions.ApplicationException;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpGet("GetOrders")]
        public async Task<IActionResult> Get()
        {
            return Ok(await _orderService.GetOrdersAsync());
        }

        [HttpGet("GetOrder/{id}")]
        public async Task<IActionResult> Get(string id)
        {
            return Ok(await _orderService.GetOrderById(id));
        }

        [HttpPost("CreateOrder")]
        public async Task<IActionResult> Post([FromBody]OrderModel order)
        {

            return Ok(await _orderService.AddOrderAsync(order));
        }

        [HttpPut("UpdateOrder/{id}")]
        public async Task<IActionResult> Put(string id, [FromBody]OrderModel order)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    if (id.Equals(order.Id))
                    {
                        return Ok(await _orderService.UpdateOrderAsync(order));
                    }
                }
            }
            catch (ApplicationException e)
            {
                return BadRequest(e.Message);
            }
            
            
            return BadRequest("Error");
        }

        [HttpDelete("RemoveOrder/{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            try
            {
                await _orderService.RemoveOrderAsync(id);
                return Ok();
            }
            catch (ApplicationException e)
            {
                return NotFound(e.Message);
            }
        }
    }
}
