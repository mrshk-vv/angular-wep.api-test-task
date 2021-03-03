using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Application.Interfaces;
using Application.Models.Customer;
using ApplicationException = Application.Exceptions.ApplicationException;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {

        private readonly ICustomerService _customerService;

        public CustomerController(ICustomerService customerService)
        {
            _customerService = customerService;
        }

        [HttpGet("GetCustomers")]
        public async Task<IActionResult> Get()
        {
            return Ok(await _customerService.GetCustomersAsync());
        }

        [HttpGet("GetCustomer/{id}")]
        public async Task<IActionResult> Get(string id)
        {
            try
            {
                return Ok(await _customerService.GetCustomerByIdAsync(id));
            }
            catch (ApplicationException e)
            {
                return NotFound(e.Message);
            }
        }

        [HttpPost("CreateCustomer")]
        public async Task<IActionResult> Post([FromBody] CustomerModel customer)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _customerService.AddCustomerAsync(customer));
            }
            return BadRequest("Invalid customer info");
        }

        [HttpPut("UpdateCustomer/{id}")]
        public void Put(string id, [FromBody] CustomerModel customer)
        {
        }

        [HttpDelete("RemoveCustomer/{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            try
            {
                await _customerService.RemoveCustomerAsync(id);
                return Ok();
            }
            catch (ApplicationException e)
            {
                return NotFound(e.Message);
            }
        }
    }
}
