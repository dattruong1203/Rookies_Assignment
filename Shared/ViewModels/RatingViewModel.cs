﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Shared.ViewModels
{
    public class RatingViewModel
    {
        public string Id { get; set; }
        public string ProductId { get; set; }
        public string TextComment { get; set; }
        public int RatingIndex { get; set; }
        public string UserId { get; set; }
    }
}
