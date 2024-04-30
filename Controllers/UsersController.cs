using AutoMapper;
using DatingApp.Data;
using DatingApp.DTOs;
using DatingApp.Entities;
using DatingApp.Extensions;
using DatingApp.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace DatingApp.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly DataContext _context;

        public UsersController(IUserRepository userRepository, IMapper mapper, DataContext context)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
        {
            var users = await _userRepository.GetUsersAsync();
            var usersToReturn = _mapper.Map<IEnumerable<MemberDto>>(users);
            return Ok(usersToReturn);
        }


        [HttpGet("api/users/{id}")]
        public async Task<ActionResult<AppUser>> GetUserById(int id)
        {
            return await _context.Users.FindAsync(id);
        }


        [HttpGet("{username}")]
        public async Task<ActionResult<MemberDto>> GetUser(string username)
        {
            var user= await _userRepository.GetUserByUsernameAsync(username);
            return _mapper.Map<MemberDto>(user);
        }


   
        [HttpPut]
        public async Task<ActionResult> UpdateUser(MemberUpdateDto memberUpdateDto)
        {
            var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await _userRepository.GetUserByUsernameAsync(username);

            if (user == null)
                return NotFound();

            // Map properties from MemberUpdateDto to AppUser
            _mapper.Map(memberUpdateDto, user);

            // Update the user entity's state to Modified
            _userRepository.Update(user);

            // Save changes to the database
            try
            {
                await _context.SaveChangesAsync();
                return NoContent(); // 204 No Content indicates successful update
            }
            catch (DbUpdateConcurrencyException)
            {
                // Handle concurrency conflicts, if needed
                // For example: return Conflict() if another user has modified the same entity concurrently
                return Conflict();
            }
            catch (DbUpdateException)
            {
                // Handle other database update errors, if needed
                return BadRequest("Failed to update user due to a database error");
            }
        }


        //[HttpGet("{username}")]
        //public async Task<ActionResult<MemberDto> GetUser(string username)
        //{
        //    return await _userRepository.GetMemberAsync(username);

        //}



    }
}
