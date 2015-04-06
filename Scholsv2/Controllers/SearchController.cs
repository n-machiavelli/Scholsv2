using Oracle.ManagedDataAccess.Client;
using Schols.Models;
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
            UserDatabase udb = new UserDatabase();
            UserModel user = udb.GetUserFromToken();
            if (user != null)
            {
                message=udb.ToggleFavorite(fav, user.UserName);
            }
            else
            {
                message = "Cannot add favorite without login";
            }
            return Ok(message);
        }
        /*  add/remove now in Toggle
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
        */
        [Route("api/dropdowndata")]
        public IHttpActionResult GetDropDownData()
        {
            DropDownData dropdownData;
            try
            {
                DBObject db = new DBObject();
                 dropdownData = db.GetDropDownData();
            }
            catch (OracleException oracleException)
            {
                System.Diagnostics.Debug.WriteLine(oracleException.Message);
                System.Diagnostics.Debug.WriteLine(oracleException.Data);
                System.Diagnostics.Debug.WriteLine(oracleException.ToString());
                return InternalServerError(oracleException);
            }
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
        public IHttpActionResult GetScholarshipData([FromUri]string fundAcct, [FromUri]string scholarNum)
        {
            DBObject db = new DBObject();
            string user=User.Identity.Name;
            ScholarshipData data;
            if (scholarNum != null && scholarNum.StartsWith("HDN"))
            {
                //this is hidden scholarship. search different table and also use join to confirm user was granted the access to apply
                data = db.GetHiddenScholarshipData(fundAcct, scholarNum, user);
            }
            else
            {
                data = db.GetScholarshipData(fundAcct, scholarNum);
            }
            System.Diagnostics.Debug.WriteLine("URI : " + fundAcct + ":" + fundAcct);
            return Ok(data);
        }

        [Route("api/favorites")]
        public IHttpActionResult GetScholarshipData()
        {
            DBObject db = new DBObject();
            UserDatabase udb = new UserDatabase();
            UserModel user = udb.GetUserFromToken();
            List<Schols.Models.ScholarshipLink> scholarships;
            scholarships = db.GetScholarships(null,(user==null?null:user.UserName),true);
            return Ok(scholarships);
        }
        [Route("api/featured")]
        public IHttpActionResult GetFeaturedScholarships()
        {
            List<ScholarshipLink> featuredScholarships;
            try
            {
                DBObject db = new DBObject();
                featuredScholarships = db.GetFeaturedScholarships();
            }
            catch (OracleException oracleException)
            {
                System.Diagnostics.Debug.WriteLine(oracleException.Message);
                System.Diagnostics.Debug.WriteLine(oracleException.Data);
                System.Diagnostics.Debug.WriteLine(oracleException.ToString());
                return InternalServerError(oracleException);
            }
            return Ok(featuredScholarships);
        }
        public List<Schols.Models.ScholarshipLink> Post([FromBody] SearchObject searchObject)
        {
            UserDatabase udb = new UserDatabase();
            UserModel user= udb.GetUserFromToken();

            //UserModel user = udb.CheckToken(authorizationField);
            //UserModel user = null; //later use Authorize framework. User.Identity and stuff
            DBObject db = new DBObject();
            List<Schols.Models.ScholarshipLink> scholarships;
            //scholarships = db.GetScholarships(searchObject);
            //scholarships = db.GetScholarshipsWithFavorites(searchObject, user);
            scholarships = db.GetScholarships(searchObject, (user==null?null:user.UserName));
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
        [Route("api/profilesearch")]
        [HttpGet]
        public IHttpActionResult Profile()
        {
            UserDatabase udb = new UserDatabase();
            UserModel user = udb.GetUserFromToken();
            DBObject db = new DBObject();
            SearchObject searchObject = new SearchObject();
            searchObject.highschoolGPA = user.HighSchoolGPA;
            searchObject.major = user.UserMajor;
            
            List<ScholarshipLink> scholarships=null;
            if (user!=null) scholarships= db.GetScholarships(searchObject, user.UserName,false,true);
            //return "{Message" + ":" + "You-accessed-this-message-with-authorization" + "}"; return Ok(headers.ToString());
            return Ok(scholarships);
        }

    }
}
