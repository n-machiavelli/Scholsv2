using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.ModelBinding;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OAuth;
using Scholsv2.Models;
using Scholsv2.Providers;
using Scholsv2.Results;
using Schols.Models;
using System.Collections.Specialized;

namespace Scholsv2.Controllers
{
    //[Authorize]
    //[RoutePrefix("api/Account")]
    public class ManualAccountController : ApiController
    {


        public ManualAccountController()
        {
        }
        [Route("api/login")]
        public IHttpActionResult Login(UserModel user)
        {
            UserDatabase udb = new UserDatabase();
            user = udb.ValidUser(user);
            if (user.AccessToken.Equals(""))
                return BadRequest("Invalid User");
            else
                return Ok(user);
        }
        [Route("api/loginwithtoken")]
        [HttpGet]
        public IHttpActionResult TokenLogin()
        {
            HttpContext httpContext = HttpContext.Current;
            NameValueCollection headerList = httpContext.Request.Headers;
            string authorizationField = headerList.Get("Authorization");
            if (authorizationField != null)
            {
                authorizationField = authorizationField.Replace("Bearer ", "");
                UserDatabase udb = new UserDatabase();
                UserModel user = udb.CheckToken(authorizationField);
                System.Diagnostics.Debug.WriteLine(authorizationField);
                System.Diagnostics.Debug.WriteLine(user.UserName);
                return Ok(user);
            }
            else
            {
                return NotFound();
            }
        }

        [Route("api/register")]
        [HttpPost]
        public IHttpActionResult Register(UserModel user)
        {
            UserDatabase udb = new UserDatabase();
            string message = udb.RegisterUser(user);
            if (message.Equals(""))
                return Ok(user);
            else
                return BadRequest(message);
        }
        [Route("api/login2")]
        public IHttpActionResult Login(string username, string password)
        {
            return Unauthorized();
        }
        [Route("api/profile")]
        [HttpGet]
        public IHttpActionResult Profile()
        {
            UserDatabase udb = new UserDatabase();
            UserModel user = udb.GetUserFromToken();
            //return "{Message" + ":" + "You-accessed-this-message-with-authorization" + "}"; return Ok(headers.ToString());
            return Ok(user);
        }
        [Route("api/saveprofile")]
        [HttpPost]
        public IHttpActionResult SaveProfile(UserModel userNewDetails)
        {
            UserDatabase udb = new UserDatabase();
            UserModel userFromDB = udb.GetUserFromToken();
            Message message = udb.SaveProfile(userFromDB,userNewDetails);

            //return "{Message" + ":" + "You-accessed-this-message-with-authorization" + "}"; return Ok(headers.ToString());
            return Ok(message);
        }





        
    }
}
