using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain;
using Microsoft.AspNetCore.Http;
using Persistence;

namespace Infrastructure
{
    public class UserAccessor(IHttpContextAccessor httpContextAccessor, AppDbContext dbContext) : IUserAccessor
    {
        public Task<User> GetUserAsync()
        {
            throw new NotImplementedException();
        }        
        public string GetUserId()
        {
            return httpContextAccessor.HttpContext?.User.FindFirst(ClaimTypes.NameIdentifier)?.Value
                ?? throw new Exception("User not found");
        }
    }
}