using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static hr_demo_app_ASPNET.Controllers.PersonnelController;

namespace hr_demo_app_ASPNET.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private static List<User> users = new List<User>
        {
            new User{email="admin@admin", password="admin"}
        };

        [HttpPost("add-user")]
        public IActionResult AddUser([FromBody] User newUser)
        {
            if (newUser == null || string.IsNullOrWhiteSpace(newUser.email))
            {
                return BadRequest("Invalid personnel data");
            }
            users.Add(newUser);
            return StatusCode(201, new { email = newUser.email });
        }

        [HttpGet("check-email")]
        public IActionResult CheckEmail([FromQuery] string email)
        {
            if (string.IsNullOrWhiteSpace(email))
                return BadRequest("Email is required");

            bool exists = users.Any(u => u.email.Equals(email, StringComparison.OrdinalIgnoreCase));
            return Ok(new { exists });
        }

        [HttpPost("check-user")]
        public IActionResult CheckUser([FromBody] User user)
        {
            if (user == null || string.IsNullOrWhiteSpace(user.email))
                return BadRequest("Email is required");

            bool foundUser = users.Any(u => u.email == user.email && u.password == user.password);
            return Ok(new { foundUser });
        }
           
    }

    public class User
    {
        public string email{ get; set; }
        public string password{ get; set; }
    }
}
