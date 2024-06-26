using AutoMapper;
using AutoMapper.QueryableExtensions;
using DatingApp.DTOs;
using DatingApp.Entities;
using DatingApp.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public UserRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task RemoveUserAsync(int userId)
        {
            // Retrieve the user entity from the database
            var user = await _context.Users.FindAsync(userId);

            if (user == null)
            {
                // User not found, handle accordingly (e.g., return or throw exception)
                return;
            }

            // Remove the user entity from the context
            _context.Users.Remove(user);

            // Save changes to apply the deletion to the database
            await _context.SaveChangesAsync();
        }

        public async Task<MemberDto> GetMemberAsync(string username)
        {
            return await _context.Users
                .Where(x => x.UserName == username)
                .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
        }

        //public async Task<PagedList<MemberDto>> GetMembersAsync(UserParams userParams)
        //{
        //    var query = _context.Users.AsQueryable();

        //    query = query.Where(u => u.UserName != userParams.CurrentUsername);
        //    query = query.Where(u => u.Gender == userParams.Gender);

        //    var minDob = DateOnly.FromDateTime(DateTime.Today.AddYears(-userParams.MaxAge - 1));
        //    var maxDob = DateOnly.FromDateTime(DateTime.Today.AddYears(-userParams.MinAge));

        //    query = query.Where(u => u.DateOfBirth >= minDob && u.DateOfBirth <= maxDob);

        //    query = userParams.OrderBy switch
        //    {
        //        "created" => query.OrderByDescending(u => u.Created),
        //        _ => query.OrderByDescending(u => u.LastActive)
        //    };

        //    return await PagedList<MemberDto>.CreateAsync(query.AsNoTracking()
        //        .ProjectTo<MemberDto>(_mapper.ConfigurationProvider),
        //            userParams.PageNumber, userParams.PageSize);
        //}

        public async Task<AppUser> GetUserByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<AppUser> GetUserByUsernameAsync(string username)
        {
            return await _context.Users
                .Include(p => p.Photos)
                .SingleOrDefaultAsync(x => x.UserName == username);
        }

        public async Task<IEnumerable<AppUser>> GetUsersAsync()
        {
            return await _context.Users
                .Include(p => p.Photos).ToListAsync();
        }

        public void Update(AppUser user)
        {
            _context.Entry(user).State = EntityState.Modified;
        }


        public async Task<bool> SaveAllAsync(AppUser user)
        {
            _context.Entry(user).State = EntityState.Modified;

            // Save the changes asynchronously and return the result
            return await _context.SaveChangesAsync() > 0;
        }

    }
}