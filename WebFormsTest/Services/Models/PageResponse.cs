using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Services.Models
{
    public class PageResponse<T>
    {
        public int TotalCount { get; set; }
        public IEnumerable<T> Page { get; set; }
    }
}