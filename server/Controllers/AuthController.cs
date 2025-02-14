using AuthServer.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.IO;
using System.Text.Json;
using TodoList;
// using Microsoft.EntityFrameworkCore; 

namespace AuthServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly ToDoDbContext _dataContext;
        private readonly ILogger<PrivateController> _logger;

        public AuthController(IConfiguration configuration, ToDoDbContext dataContext,ILogger<PrivateController> logger)
        {
            _configuration = configuration;
            _dataContext = dataContext;
              _logger = logger;
        }


        // [HttpPost("/api/login")]
        // public async IActionResult Login([FromBody] LoginModel loginModel)
        // {
        //     var user = _dataContext.Users?.FirstOrDefault(u => u.Username == loginModel.Name && u.Password == loginModel.Password);
        //     if (user is not null)
        //     {
        //         var jwt = CreateJWT(user);
        //         await AddSession(user);
        //         return Ok(jwt);
        //     }
        //     return Unauthorized();
        // }
[HttpPost("/api/login")]
public async Task<IActionResult> Login([FromBody] LoginModel loginModel)
{
    _logger.LogInformation("Entering post user method");
    Console.WriteLine("User found, creating JWT");
    var user = _dataContext.Users?.FirstOrDefault(u => u.Username == loginModel.Name && u.Password == loginModel.Password);
    if (user is not null)
    {
        _logger.LogInformation("Entering jwt  method");
        var jwt = CreateJWT(user);
        await AddSession(user);
        return Ok(jwt);
    }
    return Unauthorized();
}
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] LoginModel loginModel)
        { 
            _logger.LogInformation("Entering post register user method");
            //async Task<IActionResult>
            var name = loginModel.Name;
             _logger.LogInformation("Entering post register user method");
            var lastId = _dataContext.Users?.Max(u => u.Id) ?? 0;
            var newUser = new User { Username = name, Password = loginModel.Password };
            _dataContext.Users?.Add(newUser);
            await _dataContext.SaveChangesAsync();
            var jwt = CreateJWT(newUser);
            await AddSession(newUser);
            return Ok(jwt);
        }

        private object CreateJWT(User user)
        {
            var claims = new List<Claim>()
                {
                    new Claim("id", user.Id.ToString()),
                    new Claim("name", user.Username),
                    // new Claim("email", user.Email),
                    // new Claim("role", user.Role)
                };

            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetValue<string>("JWT:Key")));
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            var tokeOptions = new JwtSecurityToken(
                issuer: _configuration.GetValue<string>("JWT:Issuer"),
                audience: _configuration.GetValue<string>("JWT:Audience"),
                claims: claims,
                expires: DateTime.Now.AddDays(30),
                signingCredentials: signinCredentials
            );
            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
            return new { Token = tokenString };
        }

        // private void AddSession(User user)
        // {
        //     _dataContext.Sessions?.Add(new Session {UserId = user.Id, Date = DateTime.Now});
        //         // }
        //         private async Task AddSession(User user)
        // {
        //     var session = new Session { UserId = user.Id, Date = DateTime.Now };
        //     await _dataContext.Sessions?.AddAsync(session); // הוספת session
        //     await _dataContext.SaveChangesAsync(); // שמירת השינויים במסד הנתונים
        // }
        private async Task AddSession(User user)
        {
            var session = new Session { UserId = user.Id, Date = DateTime.Now };
            _dataContext.Sessions?.Add(session);
            await _dataContext.SaveChangesAsync();

        }
    }
}
