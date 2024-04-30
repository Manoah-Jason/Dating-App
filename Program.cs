using DatingApp.Data;
using DatingApp.Extensions;
using DatingApp.Interfaces;
using DatingApp.Middleware;
using DatingApp.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddIdentityServices(builder.Configuration);
builder.Services.AddEndpointsApiExplorer();

var app = builder.Build();
app.UseMiddleware<ExceptionMiddleware>();
app.UseCors(builder=>builder.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:4200"));
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

using var scope=app.Services.CreateScope();
var services = scope.ServiceProvider;
try{
    var context=services.GetRequiredService<DataContext>();
    await context.Database.MigrateAsync();
    await Seed.SeedUsers(context);
}
catch(Exception ex)
{
    var logger=services.GetService<ILogger<Program>>();
    logger.LogError(ex,"An error occured during migration");
}

var connString = "";
if (builder.Environment.IsDevelopment())
{ 
    connString = builder.Configuration.GetConnectionString("DefaultConnection");
}
app.Run();
