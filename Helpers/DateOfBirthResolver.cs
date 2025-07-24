using AutoMapper;
using DatingApp.DTOs;
using DatingApp.Entities;
using System.Globalization;

namespace DatingApp.Helpers
{
    public class DateOfBirthResolver : IValueResolver<RegisterDto, AppUser, DateOnly>
    {
        public DateOnly Resolve(RegisterDto source, AppUser destination, DateOnly destMember, ResolutionContext context)
        {
            // Safely parse the date string
            if (DateOnly.TryParseExact(source.DateOfBirth, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None, out var date))
            {
                return date;
            }

            throw new ArgumentException("Invalid date format for DateOfBirth. Expected yyyy-MM-dd.");
        }
    }
}
