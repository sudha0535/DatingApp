using API.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
var dbPath = Path.Combine(Directory.GetCurrentDirectory(), "dating.db");


// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddDbContext<DataContext>(opt =>
{
    opt.UseSqlite($"Data Source={dbPath}");
});

// Add named CORS policy (optional for clarity)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp",
        policy =>
        {
            policy.WithOrigins("http://localhost:4200", "https://localhost:4200")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

var app = builder.Build();

app.UseRouting();

app.UseCors("AllowAngularApp");

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<DataContext>();
    context.Database.Migrate(); // Automatically creates DB and tables if they don't exist
}

app.MapControllers();

app.Run();
