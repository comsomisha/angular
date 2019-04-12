using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using AutoMapper;
//using System.Web.Mvc;
using Services;

namespace Services.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "GET")]
    public class SexController : ApiController
    {
        private StrPO_2018Entities db = new StrPO_2018Entities();
       
        // GET api/sex
        [HttpGet]
        [Route("api/sexes")]
        public IEnumerable<Models.Sex> Get()
        {
            return (from s in db.Sexes.ToList() select Mapper.Map<Models.Sex>(s)).ToList();
        }
    }
}
