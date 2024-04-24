using AutoMapper;
using DatingApp.DTOs;
using DatingApp.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace DatingApp.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AppUser, MemberDto>().
                ForMember(dest=>dest.PhotoUrl,opt=>opt.MapFrom(src=>src.Photos.FirstOrDefault(x=>x.IsMain).Url));
            CreateMap<Photo, PhotoDto>();
        }
    }
}
