using API.Data;
using API.Helpers;
using API.Interfaces;
using API.Services;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions;

public static class ApplicationServiceExtentions
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services,
     IConfiguration config)
    {
        services.AddControllers();
       var dbPath = Path.Combine(Directory.GetCurrentDirectory(), "dating.db");
       services.AddDbContext<DataContext>(opt =>
       {
              opt.UseSqlite($"Data Source={dbPath}");
        });

        services.AddCors();
        services.AddScoped<ITokenService, TokenService>();
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<IPhotoService, PhotoService>();
        services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
        services.Configure<CloudinarySettings>(config.GetSection("CloudinarySettings"));

        return services;
        
    }

}
