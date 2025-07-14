using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.DTOs
{
    public class UserDto
    {
        public required string Username { get; set; }
        public required string KnownAs { get; set; }
        public required string Token { get; set; }
        public required string Gender { get; set; }
        public string? PhotoUrl { get; set; }

        public required string Id { get; set; }
        public required string Email { get; set; }   
        public required string DisplayName { get; set; }   
        public  string? ImageUrl { get; set; }


    }
}