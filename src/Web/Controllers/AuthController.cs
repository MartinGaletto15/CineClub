using Microsoft.AspNetCore.Mvc;
using Application.Interfaces;
using Application.Models.Requests;
using Microsoft.AspNetCore.Authorization;

namespace Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _service;

        public AuthController(IUserService service)
        {
            _service = service;
        }

        //LOGIN (PÚBLICO)
        [AllowAnonymous]
        [HttpPost("login")]
        public IActionResult Login(UserLoginRequest request)
        {
            var token = _service.Login(request);
            return Ok(new { Token = token });
        }

        //REGISTRO PÚBLICO (ROL FIJO = USER)
        [AllowAnonymous]
        [HttpPost("register")]
        public IActionResult Register(CreateUserRequest request)
        {
            var user = _service.Create(request);
            return Ok(user);
        }
    }
}