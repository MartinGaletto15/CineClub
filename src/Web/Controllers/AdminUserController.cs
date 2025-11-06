using Microsoft.AspNetCore.Mvc;
using Application.Interfaces;
using Application.Models.Requests;
using Microsoft.AspNetCore.Authorization;

namespace Web.Controllers
{
    [ApiController]
    [Route("api/admin/users")]
    [Authorize(Roles = "Admin,SuperAdmin")] // Solo admins
    public class AdminUserController : ControllerBase
    {
        private readonly IUserService _service;

        public AdminUserController(IUserService service)
        {
            _service = service;
        }

        [HttpGet]
        public IActionResult GetAll() => Ok(_service.GetAll());

        [HttpPut("{id}/role")]
        public IActionResult UpdateRole(int id, [FromBody] UpdateUserRequest request)
        {
            var user = _service.Update(id, request);
            return Ok(user);
        }

        [Authorize(Roles = "SuperAdmin")] // Solo superadmin puede eliminar
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var success = _service.Delete(id);
            return success ? NoContent() : NotFound();
        }
    }
}