﻿using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ServerBE.Models
{
    public class User : IdentityUser
    {
        public string Username { get; set; }
    }
}