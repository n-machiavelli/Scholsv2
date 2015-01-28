﻿using Schols.Models;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace Scholarship.Controllers
{
    //[RoutePrefix("api/scholarships")]

    public class SearchController : ApiController
    {
        [Route("api/togglefavorite")]
        [HttpPost]
        public IHttpActionResult AddFavorite(Favorite fav)
        {
            string message = "";
            string user = User.Identity.Name;
            if (user != null && user != "")
            {
                UserDatabase udb = new UserDatabase();
                message=udb.ToggleFavorite(fav, user);
            }
            else
            {
                message = "Cannot add favorite without login";
            }
            return Ok(message);
        }
        [Route("api/removefavorite")]
        [HttpPost]
        public IHttpActionResult RemoveFavorite(Favorite fav)
        {
            HttpContext httpContext = HttpContext.Current;
            NameValueCollection headerList = httpContext.Request.Headers;
            string authorizationField = headerList.Get("Authorization");
            authorizationField = authorizationField.Replace("Bearer ", "");
            UserDatabase udb = new UserDatabase();
            UserModel user = udb.CheckToken(authorizationField);
            string message = udb.RemoveFavorite(fav, user);
            //return "{Message" + ":" + "You-accessed-this-message-with-authorization" + "}"; return Ok(headers.ToString());
            return Ok(message);
        }

        [Route("api/dropdowndata")]
        public IHttpActionResult GetDropDownData()
        {
            DBObject db = new DBObject();
            DropDownData dropdownData = db.GetDropDownData();
            return Ok(dropdownData);
        }

        [Route("api/departments")]
        public IHttpActionResult GetDepartments()
        {
            DBObject db = new DBObject();
            List<Schols.Models.Department> departments = db.GetDepartments();
            return Ok(departments);
        }
        [Route("api/colleges")]
        public IHttpActionResult GetColleges()
        {
            DBObject db = new DBObject();
            List<Schols.Models.College> colleges = db.GetColleges();
            return Ok(colleges);
        }
        [Route("api/schoolyears")]
        public IHttpActionResult GetSchoolYears()
        {
            DBObject db = new DBObject();
            List<Schols.Models.SchoolYear> schoolYears = db.GetSchoolYears();
            return Ok(schoolYears);
        }

        //[HttpPost]
        //public HttpResponseMessage Post([FromBody] SearchObject searchObject)
        //{
        //            return Request.CreateResponse(HttpStatusCode.Created);

        //}
        //[Route("post")]

        //public IEnumerable<SCHLRSHP> Post([FromBody] SearchObject searchObject)
        [Route("api/scholarshipdetails")]
        public IHttpActionResult GetScholarshipData([FromUri]string f, [FromUri]string s)
        {
            DBObject db = new DBObject();
            ScholarshipData data = db.GetScholarshipData(f, s);
            System.Diagnostics.Debug.WriteLine("URI : " + f + ":" + s);
            return Ok(data);
        }

        public List<Schols.Models.ScholarshipLink> Post([FromBody] SearchObject searchObject)
        {
            HttpContext httpContext = HttpContext.Current;
            NameValueCollection headerList = httpContext.Request.Headers;
            //string authorizationField = headerList.Get("Authorization");
            //authorizationField = authorizationField.Replace("Bearer ", "");
            //UserDatabase udb = new UserDatabase();
            //UserModel user = udb.CheckToken(authorizationField);
            //UserModel user = null; //later use Authorize framework. User.Identity and stuff
            string user = User.Identity.Name;
            DBObject db = new DBObject();
            List<Schols.Models.ScholarshipLink> scholarships;
            //scholarships = db.GetScholarships(searchObject);
            //scholarships = db.GetScholarshipsWithFavorites(searchObject, user);
            scholarships = db.GetScholarships(searchObject, user);
            return scholarships;
            //Request.CreateResponse(HttpStatusCode.Created,scholarship);
            //String idString = id.ToString();
            //var scholarship = db.SCHLRSHPs.Where(s => (s.FRML_SCHLRSHP_NAME.Contains(searchObject.title) || s.SCHLRSHP_TITLE.Contains(searchObject.title) || s.SCHLRSHP_PRPS.Contains(searchObject.purpose)));
            //var query = database.Posts    // your starting point - table in the "from" statement
            //   .Join(database.Post_Metas, // the source table of the inner join
            //      post => post.ID,        // Select the primary key (the first part of the "on" clause in an sql "join" statement)
            //      meta => meta.Post_ID,   // Select the foreign key (the second part of the "on" clause)
            //      (post, meta) => new { Post = post, Meta = meta }) // selection
            //   .Where(postAndMeta => postAndMeta.Post.ID == id);
            /*
            var ss=db.SCHLRSHPs.Where(s => s.FUND_ACCT.Trim().Contains("307"));
            var lst = db.SCHLRSHPs.Where(s => s.FUND_ACCT == "307846").Include(sc => sc.KPIScores).ToList();
            var scholarship = db.SCHLRSHPs
                                .Join(db.FUNDs,
                                s => s.FUND_ACCT, f => f.FUND_ACCT,
                                (s,f) => new { S=s, F=f})
              */
            /*
            .Join(db
            .Where(s => (s.FRML_SCHLRSHP_NAME.Contains(searchObject.title) || s.SCHLRSHP_TITLE.Contains(searchObject.title)
                            || s.SCHLRSHP_PRPS.Contains(searchObject.purpose)));
             * */
            //var scholarship = db.SCHLRSHPs.Where(s => s.FUND_ACCT.Trim().Contains("307"));

        }

    }
}
