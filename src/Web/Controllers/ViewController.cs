using Application.Models;
using Application.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Application.Models.Requests;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ViewController : ControllerBase
    {
        private readonly IViewService _viewService;

        public ViewController(IViewService viewService)
        {
            _viewService = viewService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _viewService.GetAllAsync();
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _viewService.GetByIdAsync(id);
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateViewRequest dto)
        {
            var result = await _viewService.CreateAsync(dto);
            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, UpdateViewRequest dto)
        {
            var result = await _viewService.UpdateAsync(id, dto);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _viewService.DeleteAsync(id);
            return NoContent();
        }
    }
}