﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Schols.Models
{
    public class UserModel
    {
        public string UserName { get; set; }
        public string UserPassword { get; set; }
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
        public string UserMajor { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string UniversityId { get; set; }
        public string PhoneNumber { get; set; }

    }
}