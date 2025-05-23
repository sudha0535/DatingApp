using System;
using System.Runtime.CompilerServices;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class UsersController(DataContext context) : BaseApiController
{
    [AllowAnonymous]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<AppUser>>>GetUsers()
    {
        var users = await  context.Users.ToListAsync();

        return users;
    }

    [Authorize]
    [HttpGet("{id:int}")] // /api/users/id
    public async Task <ActionResult<AppUser>>GetUser(int id)
    {
            try
        {
            var user = await context.Users.FindAsync(id);

            if (user == null) return NotFound();

            return user;
        }
        catch (Exception ex)
        {
            // Log ex.Message or ex.ToString() here
            return StatusCode(500, "Internal server error: " + ex.Message);
        }
    }
}
