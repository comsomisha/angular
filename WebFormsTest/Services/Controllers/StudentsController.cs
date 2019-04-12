using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
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
    [EnableCors(origins: "*", headers: "*", methods: "GET,POST,DELETE,PUT")]
    public class StudentsController : ApiController
    {
        private StrPO_2018Entities db = new StrPO_2018Entities();

        //IEnumerable<Models.Student>
        
        // GET api/students?pageNum=3&pageLength=10&column=Name&dest=asc
        public Models.PageResponse<Models.Student> Get(
            [FromUri]int pageNum = 1, //1...
            [FromUri]int pageLength = 10,
            [FromUri]string column = null,
            [FromUri]string dest = "asc")
        {
            if (string.IsNullOrEmpty(column) || column == "undefined")
            {
                column = "Surname";
            }
            string command = dest == "desc" ? "OrderByDescending" : "OrderBy";
            var type = typeof(Student);
            var property = type.GetProperty(column);
            var parameter = Expression.Parameter(type, "p");
            var propertyAccess = Expression.MakeMemberAccess(parameter, property);
            var orderByExpression = Expression.Lambda(propertyAccess, parameter);
            var resultExpression = Expression.Call(typeof(Queryable), command, new Type[] { type, property.PropertyType },
                                          (from s in db.Students select s).Expression, Expression.Quote(orderByExpression));
            var q = (from s in db.Students select s).Provider.CreateQuery<Student>(resultExpression);
            q = q.Skip((pageNum - 1) * pageLength).Take(pageLength);

            var dbList = q.ToList();
            var response = new Models.PageResponse<Models.Student>();
            response.Page = (from s in dbList select Mapper.Map<Models.Student>(s)).ToList();
            response.TotalCount = db.Students.Count();
            return response;
        }

        // GET api/student?id=5
        [Route("api/student")]
        public HttpResponseMessage Get([FromUri]int id)
        {
            var student = (from s in db.Students where s.ID == id select s).FirstOrDefault();
            if (student == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse<Models.Student>(Mapper.Map<Models.Student>(student));
        }

        [Route("api/student")]
        [HttpPost]
        public HttpResponseMessage Post([FromBody]Models.Student sss)
        {
            if (ModelState.IsValid)
            {
                Student s = Mapper.Map<Student>(sss);

                db.Students.Add(s);
                db.SaveChanges();
				sss.ID = s.ID;
                return Request.CreateResponse<Models.Student>(HttpStatusCode.Created, sss);
            }
            return Request.CreateResponse(HttpStatusCode.BadRequest);
        }

        // PUT api/student?id=5
        [Route("api/student")]
        [HttpPut]
        public HttpResponseMessage Put([FromUri]int id, [FromBody]Models.Student sss)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    Student s = Mapper.Map<Student>(sss);
                    
                    if ((from ss in db.Students where ss.ID == id select ss.ID).Count() == 0)
                    {
                        return Request.CreateResponse(HttpStatusCode.NotFound);
                    }

                    db.Students.Attach(s);
                    db.Entry(s).State = EntityState.Modified;
                    db.SaveChanges();

                    s = db.Students.Find(id);

                    return Request.CreateResponse<Models.Student>(HttpStatusCode.Created, Mapper.Map<Models.Student>(s));
                }
                catch (Exception ex)
                {
                    return Request.CreateResponse(HttpStatusCode.InternalServerError);
                }
            }
            return Request.CreateResponse(HttpStatusCode.BadRequest);
        }

        // DELETE api/student/5
        [Route("api/student")]
        [HttpDelete]
        public HttpResponseMessage Delete(int id)
        {
            try
            {
                Student student = db.Students.Find(id);
                if (student == null)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound);
                }
                db.Students.Remove(student);
                db.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.Created);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError);
            }
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
