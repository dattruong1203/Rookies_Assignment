﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Shared.Dto.Product
{
    public class ProductCriteriaDto : BaseQueryCriteriaDto
    {
        public int[] Types { get; set; }
    }
}
