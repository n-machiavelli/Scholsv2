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
            HttpContext context = HttpContext.Current;
            var userName = User.Identity.Name; //context.Request.Form["name"];
            if (userName == null) userName = "defaultuser"; //TODO:Remove
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
                    fnamepath = serverPath + "\\" + fname ;
                    //fname = serverPath + "\\" + file.FileName;
                    file.SaveAs(fnamepath);
                }
            }
            //context.Response.ContentType = "text/plain";
            //context.Response.Write("File/s uploaded successfully!");
            return Ok(fname);
        }
        [Route("api/apply")]
        [HttpPost]
        public IHttpActionResult ApplyForScholarship(ScholarshipApp app)
        {
            string username = User.Identity.Name;
            UserDatabase udb = new UserDatabase();
            Message message = new Message();
            message.body = udb.Apply(app, username);
            message.title = "Application Message";
            //return "{Message" + ":" + "You-accessed-this-message-with-authorization" + "}"; return Ok(headers.ToString());
            return Json(message);
        }
        [Route("api/applications")]
        [HttpPost]
        public IHttpActionResult GetApplications()
        {
            //TODO: move token code to another fxn... repetition 
            string username = User.Identity.Name;
            UserDatabase udb = new UserDatabase();
            DBObject db = new DBObject();
            List<Schols.Models.ScholarshipApp> applications;
            applications = db.GetApplications();
            return Ok(applications);
        }
    }
}
