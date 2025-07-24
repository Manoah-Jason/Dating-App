using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;

namespace DatingApp.Entities
{
    public class AppUser : IdentityUser<int>
    {
        public string DisplayName { get; set; } = string.Empty;
        public DateOnly DateOfBirth { get; set; } // Keep as DateOnly

        public string KnownAs { get; set; } = string.Empty;
        public DateTime Created { get; set; } = DateTime.UtcNow;
        public DateTime LastActive { get; set; } = DateTime.UtcNow;
        public string Gender { get; set; } = string.Empty;
        public string Introduction { get; set; } = string.Empty;
        public string LookingFor { get; set; } = string.Empty;
        public string Interests { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string Country { get; set; } = string.Empty;

        public List<Photo> Photos { get; set; } = new();

        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
    }
}
