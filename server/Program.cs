using Microsoft.EntityFrameworkCore;
using TodoList;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using AuthServer.CustomAuth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.OpenApi.Models;
using System.IdentityModel.Tokens.Jwt;
using AuthServer;
//
var builder = WebApplication.CreateBuilder(args);
builder.Services.Configure<Application>(builder.Configuration.GetSection(nameof(Application)));

builder.Services.AddSingleton<IAuthorizationMiddlewareResultHandler, CustomAuthorizationHandler>();

JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Name = "Authorization",
        Description = "Bearer Authentication with JWT Token",
        Type = SecuritySchemeType.Http
    });
    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        { 
            new OpenApiSecurityScheme
            {
        Reference = new OpenApiReference
                {
                    Id = "Bearer",
                    Type = ReferenceType.SecurityScheme
                }
            },
            new List<string>()
        }
    });
});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["JWT:Issuer"],
ValidAudience = builder.Configuration["JWT:Audience"], // קהל היעד של הטוקן
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Key"]))
        };
    });

// var devCorsPolicy = "devCorsPolicy";

// builder.Services.AddCors(options =>
// {
//     options.AddPolicy(devCorsPolicy, builder => {
//         builder.AllowAnyOrigin()
//         .AllowAnyMethod().
//         AllowAnyHeader();

//     });
// });

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder => builder.AllowAnyOrigin()
                          .AllowAnyMethod()
                          .AllowAnyHeader());
});
builder.Services.AddDbContext<ToDoDbContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("ToDoDB"),
                     Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.40-mysql")));


var app = builder.Build();
app.UseCors("AllowAll");
// app.UseCors(devCorsPolicy);
app.MapGet("/", () => "chany Irom!");

app.MapGet("/tasks", async (ToDoDbContext dbContext) =>
{
    var tasks = await dbContext.Items.ToListAsync();

    return Results.Ok(tasks);
});

app.MapPost("/tasks",async (ToDoDbContext dbContext,Item taskDto) =>
{
    dbContext.Items.Add(taskDto);
    await dbContext.SaveChangesAsync();
    return Results.Ok(taskDto);
});
 app.MapPut("/tasks/{id}", async (ToDoDbContext dbContext,int id,Item taskDto) =>
{
    var items = await dbContext.Items.FindAsync(id);
    // var items =  dbContext.Items.First(a => a.Id == id);
    if(taskDto.TaskName!=null)
      items.TaskName = taskDto.TaskName;
      if(taskDto.IsComplete!=null)
      items.IsComplete=taskDto.IsComplete;
     dbContext.SaveChanges();
    return Results.Ok(new { message = $"המשימה '{items.TaskName}' עודכנה בהצלחה"});
});
     app.MapDelete("/tasks/{id}",async (ToDoDbContext dbContext,int id) =>
{
    var task = await dbContext.Items.FindAsync(id);

    if (task == null)
    {
        return Results.NotFound(new { message = "משימה לא נמצאה" });
    }
     dbContext.Items.Remove(task);
    await dbContext.SaveChangesAsync();
    return Results.Ok(new { message = $"המשימה '{task.TaskName}' נמחקה בהצלחה" });
}); 

// if (app.Environment.IsDevelopment())
// {
    app.UseSwagger(); 

    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
        options.RoutePrefix = string.Empty; 
    });
// }
app.UseHttpsRedirection();

app.Use(async (context, next) =>
{
    if (context.Request.Method == "OPTIONS")
    {
        context.Response.Headers.Add("Access-Control-Allow-Origin", "*");
        context.Response.Headers.Add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        context.Response.Headers.Add("Access-Control-Allow-Headers", "Content-Type, Authorization");
        context.Response.StatusCode = 200;
        return;
    }
    await next();
});

app.UseForwardedHeaders(new ForwardedHeadersOptions
{
    ForwardedHeaders = ForwardedHeaders.XForwardedFor |
    ForwardedHeaders.XForwardedProto
});
app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();