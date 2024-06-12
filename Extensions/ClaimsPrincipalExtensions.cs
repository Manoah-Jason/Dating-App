using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.Extensions
{ using System.Security.Claims;
  public static class ClaimsPrincipalExtensions
{
        public static string GetUsername(this ClaimsPrincipal user)
        {
            if (user == null)
            {
                Console.WriteLine("ClaimsPrincipal is null.");
                return null;
            }

            foreach (var claim in user.Claims)
            {
                Console.WriteLine($"Claim Type: {claim.Type}, Claim Value: {claim.Value}");
                return claim.Value;
            }
            return user.FindFirst(ClaimTypes.Name)?.Value;

        }
        public static int GetUserId(this ClaimsPrincipal user)
    {
        return int.Parse(user.FindFirst(ClaimTypes.NameIdentifier)?.Value);
    }
}
}