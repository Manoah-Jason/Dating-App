using DatingApp.Data;
using DatingApp.DTOs;
using DatingApp.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace DatingApp.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataContext _context;
        public AccountController(DataContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public async Task<ActionResult<AppUser>> Register(RegisterDto registerDto)
        {
            if (await UserExists(registerDto.UserName)) return BadRequest("Username is taken");
            using var hmac = new HMACSHA512();
            var user = new AppUser
            {
                UserName = registerDto.UserName,
                PasswordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key
            };
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }



        [HttpPost("login")]
        public async Task<ActionResult<AppUser>> Login(LoginDto loginDto)
        {
            var user = await _context.Users.SingleOrDefaultAsync(
              x => x.UserName == loginDto.UserName);
            if (user == null) return Unauthorized();
            using var hmac = new HMACSHA512(user.PasswordSalt);
            var computeHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));
            for (int i = 0; i < computeHash.Length; i++)
            {
                if (computeHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid password");

            }

            return user;
        }

        private async Task<bool> UserExists(string username)
        {
            return await _context.Users.AnyAsync(x => x.UserName == username);
        }


    }



}