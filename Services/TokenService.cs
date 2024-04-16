using System;
using System.Collections.Generic;

using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using DatingApp.Entities;
using DatingApp.Interfaces;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;


namespace DatingApp.Services
{
    public class TokenService : ITokenService
    {
        private readonly SymmetricSecurityKey _key;

        public TokenService(IConfiguration config)
        {
            _key=new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));
        }

        public string CreateToken(AppUser user)
        {
            var claims = new List<Claim>()
            {
                new Claim(JwtRegisteredClaimNames.NameId, user.UserName)
            };

           var creds = new SigningCredentials(_key,SecurityAlgorithms.HmacSha512Signature);
           
           var tokenDescriptor= new SecurityTokenDescriptor
           {
            Subject=new ClaimsIdentity(claims),
            Expires=DateTime.Now.AddDays(7),
            SigningCredentials=creds
           };
           var tokenHandler= new System.IdentityModel.Tokens.Jwt.JwtSecurityTokenHandler();
           var token =tokenHandler.CreateToken(tokenDescriptor);
           return tokenHandler.WriteToken(token);
        }
    }
    }
