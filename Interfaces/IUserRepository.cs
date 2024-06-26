using DatingApp.DTOs;
using DatingApp.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.Interfaces
{
    public interface IUserRepository
    {
        void Update(AppUser user);
        Task<IEnumerable<AppUser>> GetUsersAsync();
        Task<AppUser> GetUserByIdAsync(int id);
        Task<AppUser> GetUserByUsernameAsync(string username);

        Task<MemberDto> GetMemberAsync(string username);
        Task RemoveUserAsync(int id);
        Task<bool> SaveAllAsync(AppUser user);
    }
}