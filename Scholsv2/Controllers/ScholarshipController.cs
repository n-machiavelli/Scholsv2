using Schols.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace Scholsv2.Controllers
{
    public class ScholarshipController : ApiController
    {
        [Route("api/fileupload")]
        [HttpPost]
        public IHttpActionResult FileUpload()
        {
            string fname = "";
            string fnamepath = "";
            string ext = "";
            UserDatabase udb = new UserDatabase();
            UserModel user = udb.GetUserFromToken();

            HttpContext context = HttpContext.Current;
            var userName = user.UserName; //context.Request.Form["name"];
            if (user == null) userName = "defaultuser"; //TODO:Remove
            string serverPath = context.Server.MapPath("Upload\\" + userName.ToUpper());
            if (!Directory.Exists(serverPath))
                Directory.CreateDirectory(serverPath);

            if (context.Request.Files.Count > 0)
            {
                HttpFileCollection files = context.Request.Files;
                
                for (int i = 0; i < files.Count; i++)
                {
                    HttpPostedFile file = files[i];
                    //TODO: LATER GUID AND FILE.EXIST...AND EXCEPTION
                    ext = Path.GetExtension(file.FileName);
                    fname = Guid.NewGuid() + ext;
                    System.Diagnostics.Debug.WriteLine(fname);
                    System.Diagnostics.Debug.WriteLine(ext);
                    
                    fnamepath = serverPath + "\\" + fname ;
                    //fname = serverPath + "\\" + file.FileName;
                    file.SaveAs(fnamepath);
                }
            }
            //context.Response.ContentType = "text/plain";
            //context.Response.Write("File/s uploaded successfully!");
            Message message = new Message();
            message.title = "File Uploaded";
            message.body = fname;
            return Ok(message);
        }
        [Route("api/apply")]
        [HttpPost]
        public IHttpActionResult ApplyForScholarship(ScholarshipApp app)
        {
            UserDatabase udb = new UserDatabase();
            UserModel user = udb.GetUserFromToken();
            Message message = new Message();
            message.body = udb.Apply(app, (user==null?null:user.UserName));
            message.title = "Application Message";
            //return "{Message" + ":" + "You-accessed-this-message-with-authorization" + "}"; return Ok(headers.ToString());
            return Json(message);
        }
        [Route("api/distinctscholarships")]
        [HttpPost]
        public IHttpActionResult GetDistinctScholarships()
        {
            DBObject db = new DBObject();
            List<ScholarshipLink> scholarshipLinks;
            scholarshipLinks = db.GetDistinctScholarshipNames();
            return Ok(scholarshipLinks);
        }
        [Route("api/filteredapplications")]
        public IHttpActionResult GetFilteredApplications([FromUri]string f, [FromUri]string s)
        {
            DBObject db = new DBObject();
            List<Schols.Models.ScholarshipApp> applications;
            applications = db.GetApplications(f,null,s);
            return Ok(applications);
        }
        [Route("api/applications")]
        [HttpPost]
        public IHttpActionResult GetApplications()
        {
            UserDatabase udb = new UserDatabase();
            UserModel user = udb.GetUserFromToken();
            DBObject db = new DBObject();
            List<Schols.Models.ScholarshipApp> applications;
            applications = db.GetApplications();
            return Ok(applications);
        }

        [Route("api/myapplications")]
        [HttpPost]
        public IHttpActionResult GetMyApplications()
        {
            UserDatabase udb = new UserDatabase();
            UserModel user = udb.GetUserFromToken();
            DBObject db = new DBObject();
            List<Schols.Models.ScholarshipApp> applications;
            applications = db.GetApplications(null,(user==null?null:user.UserName));
            return Ok(applications);
        }
        [Route("api/generateexcel")]
        [HttpPost]
        public IHttpActionResult GenerateAppsExcel()
        {
            DBObject db = new DBObject();
            Message message = db.GenerateAppsExcel();
            return Json(message);
        }
        [Route("api/applicationforid")]
        [HttpPost]
        public IHttpActionResult GetApplicationWithID(GenericObject posted)
        {
            //using generic object because of issues posting strings and integers directly into native params
            UserDatabase udb = new UserDatabase();
            ScholarshipApp application = udb.GetApplication(long.Parse(posted.id));
            return Json(application);
        }
        [Route("api/saveappstatus")]
        [HttpPost]
        public IHttpActionResult SaveApplicationWithID(ScholarshipApp app)
        {
            //using generic object because of issues posting strings and integers directly into native params
            UserDatabase udb = new UserDatabase();
            Message message= udb.SaveApplication(app);
            return Json(message);
        }
    }
}
