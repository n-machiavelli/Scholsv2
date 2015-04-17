using Oracle.ManagedDataAccess.Client;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Data;
using System.Data.SqlClient;
using System.Data.SqlServerCe;
using System.Linq;
using System.Security.Cryptography;
using System.Web;
using System.Web.Security;

namespace Schols.Models
{
    public class UserDatabase
    {
        public UserModel ValidUserSQLCE(UserModel user)
        {
            /* TODO: Deprecate since we using asp.net identity */
            DBObject db = new DBObject();

            string sqlstr = "SELECT PasswordHash,Salt,FirstName,LastName,UserMajor,UserName FROM scholarshipcenter.manualusers where UserName= @UserName";
            List<SqlCeParameter> parameters = new List<SqlCeParameter>();
            parameters.Add(new SqlCeParameter("@UserName", user.UserName));
            DataTable dt = db.querySQLServer(sqlstr, parameters);
            if (dt.Rows.Count == 0)
            {
                user.AccessToken = "";
                user.UserName = "";
                return user;
            }
            string storedHash = dt.Rows[0]["PasswordHash"].ToString();
            string storedSalt = dt.Rows[0]["Salt"].ToString();
            string firstName = dt.Rows[0]["FirstName"].ToString();
            string lastName = dt.Rows[0]["LastName"].ToString();
            string usermajor = dt.Rows[0]["UserMajor"].ToString();
            string username = dt.Rows[0]["UserName"].ToString();
            string inputHash = CreatePasswordHash(user.UserPassword, storedSalt);
            if (storedHash.Equals(inputHash))
            {
                user.AccessToken = generateToken(user);
                user.FirstName = firstName;
                user.LastName = lastName;
                user.UserName = username;
                user.UserMajor = usermajor;
                return user;
            }
            else
            {
                user.AccessToken = "";
                user.Email = "";
                return user;
            }
        }
        public UserModel ValidUser(UserModel user)
        {
            /* TODO: Deprecate since we using asp.net identity */
            DBObject db = new DBObject();

            string sqlstr = "SELECT PasswordHash,Salt,FirstName,LastName,UserMajor,UserName FROM scholarshipcenter.manualusers where UserName= :UserName";
            List<OracleParameter> parameters = new List<OracleParameter>();
            parameters.Add(new OracleParameter("UserName", user.UserName));
            DataTable dt = db.query(sqlstr, parameters);
            if (dt.Rows.Count == 0)
            {
                user.AccessToken = "";
                user.UserName = "";
                return user;
            }
            string storedHash = dt.Rows[0]["PasswordHash"].ToString();
            string storedSalt = dt.Rows[0]["Salt"].ToString();
            string firstName = dt.Rows[0]["FirstName"].ToString();
            string lastName = dt.Rows[0]["LastName"].ToString();
            string usermajor = dt.Rows[0]["UserMajor"].ToString();
            string username = dt.Rows[0]["UserName"].ToString();
            string inputHash = CreatePasswordHash(user.UserPassword, storedSalt);
            if (storedHash.Equals(inputHash))
            {
                user.AccessToken = generateToken(user);
                user.FirstName = firstName;
                user.LastName = lastName;
                user.UserName = username;
                user.UserMajor = usermajor;
                return user;
            }
            else
            {
                user.AccessToken = "";
                user.Email = "";
                return user;
            }
        }
        public bool UserExists(UserModel user)
        {
            DBObject db = new DBObject();
            String sqlstr = "SELECT * FROM scholarshipcenter.manualusers where UserName= :UserName";
            List<OracleParameter> parameters = new List<OracleParameter>();
            parameters.Add(new OracleParameter("UserName", user.UserName));
            DataTable dt = db.query(sqlstr, parameters);
            if (dt.Rows.Count == 0)
                return false;
            else
                return true;
        }
        private UserModel GetUser(UserModel user)
        {
            DBObject db = new DBObject();
            String sqlstr = "SELECT * FROM scholarshipcenter.manualusers where UserName= :UserName";
            List<OracleParameter> parameters = new List<OracleParameter>();
            parameters.Add(new OracleParameter("UserName", user.UserName));
            DataTable dt = db.query(sqlstr, parameters);
            if (dt.Rows.Count == 0)
            {
                return null;
            }
            else
            {
                user.UserMajor = dt.Rows[0]["UserMajor"].ToString();
                user.UserName = dt.Rows[0]["UserName"].ToString();
                user.FirstName = dt.Rows[0]["FirstName"].ToString();
                user.MiddleName = dt.Rows[0]["MiddleName"].ToString();
                user.LastName = dt.Rows[0]["LastName"].ToString();
                user.UniversityId = dt.Rows[0]["UniversityId"].ToString();
                user.PhoneNumber = dt.Rows[0]["PhoneNumber"].ToString();
                user.PresentGPA = dt.Rows[0]["PresentGPA"].ToString();
                user.HighSchoolGPA = dt.Rows[0]["HighSchoolGPA"].ToString();
                user.CommunityService = dt.Rows[0]["CommunityService"].ToString();
                user.ExtraCurricular = dt.Rows[0]["ExtraCurricular"].ToString();
                user.Address = dt.Rows[0]["Address"].ToString();
                user.SchoolYear = dt.Rows[0]["SchoolYear"].ToString();
                user.IsTransfer = dt.Rows[0]["IsTransfer"].ToString();
                System.Diagnostics.Debug.WriteLine(user.FirstName);
                //System.Diagnostics.Debug.WriteLine(user.UserName);
                return user;
            }
        }

        public string RegisterUser(UserModel user)
        {
            if (UserExists(user))
            {
                return "User Exists Already";
            }
            DBObject db = new DBObject();
            String sqlstr = "INSERT INTO scholarshipcenter.manualusers (UserName,PasswordHash,Salt,UserMajor,FirstName,LastName,MiddleName,PhoneNumber,UniversityId,PresentGPA,HighSchoolGPA,CommunityService,ExtraCurricular,Address,SchoolYear,IsTransfer) VALUES (:UserName,:PasswordHash,:Salt,:UserMajor,:FirstName,:LastName,:MiddleName,:PhoneNumber,:UniversityId,:PresentGPA,:HighSchoolGPA,:CommunityService,:ExtraCurricular,:Address,:SchoolYear,:IsTransfer)";
            string salt = CreateSalt(4);
            string passwordhash = CreatePasswordHash(user.UserPassword, salt);
            List<OracleParameter> parameters = new List<OracleParameter>();
            //parameters.Add(new SqlCeParameter("UserName", user.UserName));
            parameters.Add(new OracleParameter("UserName", user.UserName == null ? "" : user.UserName));
            parameters.Add(new OracleParameter("passwordhash", passwordhash));
            parameters.Add(new OracleParameter("salt", salt));
            parameters.Add(new OracleParameter("UserMajor", user.UserMajor == null ? "" : user.UserMajor));
            parameters.Add(new OracleParameter("FirstName", user.FirstName == null ? "" : user.FirstName));
            parameters.Add(new OracleParameter("LastName", user.LastName == null ? "" : user.LastName));
            parameters.Add(new OracleParameter("MiddleName", user.MiddleName == null ? "" : user.MiddleName));
            parameters.Add(new OracleParameter("PhoneNumber", user.PhoneNumber == null ? "" : user.PhoneNumber));
            parameters.Add(new OracleParameter("UniversityId", user.UniversityId == null ? "" : user.UniversityId));
            parameters.Add(new OracleParameter("PresentGPA", user.PresentGPA == null ? "" : user.PresentGPA));
            parameters.Add(new OracleParameter("HighSchoolGPA", user.HighSchoolGPA == null ? "" : user.HighSchoolGPA));
            parameters.Add(new OracleParameter("CommunityService", user.CommunityService == null ? "" : user.CommunityService));
            parameters.Add(new OracleParameter("ExtraCurricular", user.ExtraCurricular == null ? "" : user.ExtraCurricular));
            parameters.Add(new OracleParameter("Address", user.Address == null ? "" : user.Address));
            parameters.Add(new OracleParameter("SchoolYear", user.SchoolYear == null ? "" : user.SchoolYear));
            parameters.Add(new OracleParameter("IsTransfer", user.IsTransfer == null ? "" : user.IsTransfer));

            int count = db.queryExecute(sqlstr, parameters);
            if (count == 1)
            {
                return "";
            }
            else
            {
                return "Could not create user.";
            }
        }
        /*TODO: All above deprecated due to .net identity */

        public string Apply(ScholarshipApp app, string username) //UserModel user)
        {
            string sqlstr = "SELECT * FROM scholarshipcenter.applications WHERE username=:username AND fund_acct=:fund_acct AND SCHLRSHP_NUM=:SCHLRSHP_NUM";
            string message = "";
            DBObject db = new DBObject();
            List<OracleParameter> parameters = new List<OracleParameter>();
            parameters.Add(new OracleParameter("username", username));
            parameters.Add(new OracleParameter("fund_acct", app.fund_acct));
            parameters.Add(new OracleParameter("SCHLRSHP_NUM", app.SCHLRSHP_NUM));

            DataTable dt = db.query(sqlstr, parameters);
            if (dt.Rows.Count == 0)
            {
                if (app.SCHLRSHP_NUM != null && app.SCHLRSHP_NUM.Contains("HDN"))
                {
                    sqlstr = "SELECT hs.fund_acct, hs.frml_schlrshp_name, hs.schlrshp_prps FROM scholarshipcenter.hiddenschlrshp hs INNER JOIN scholarshipcenter.usersforhidden uh ON hs.fund_acct=uh.fund_acct";
                    sqlstr += " WHERE regexp_like(hs.fund_acct,:fund_acct,'i') AND regexp_like(uh.username,:username,'i')";
                    //sqlstr += " WHERE regexp_like(hs.fund_acct,'" + fundAcct + "','i') AND regexp_like(uh.username,'" + user + "','i')";
                    List<OracleParameter> parameters2 = new List<OracleParameter>();
                    parameters2.Add(new OracleParameter("fund_acct", app.fund_acct));
                    parameters2.Add(new OracleParameter("username", username));
                    ScholarshipData data = new ScholarshipData();
                    dt = db.query(sqlstr, parameters2);
                    if (dt.Rows.Count == 0)
                    {
                        message = "You need permission to submit this application";
                        return message;
                    }
                }
                sqlstr = "INSERT INTO scholarshipcenter.applications (universityid,firstname,middlename,lastname,address,phonenumber,usermajor,username,fund_acct,essayfilename,reffilename,scholarshipyear,expectedgraduation,presentgpa,highschoolgpa,communityservice,extracurricular,awardshonors,SCHLRSHP_NUM,IsTransfer,SchoolYear) VALUES (:universityid,:firstname,:middlename,:lastname,:address,:phonenumber,:usermajor,:username,:fund_acct,:essayfilename,:reffilename,:scholarshipyear,:expectedgraduation,:presentgpa,:highschoolgpa,:communityservice,:extracurricular,:awardshonors,:SCHLRSHP_NUM,:IsTransfer,:SchoolYear)";
                List<OracleParameter> insertParameters = new List<OracleParameter>();
                insertParameters.Add(new OracleParameter("universityid", app.UniversityId == null ? "" : app.UniversityId));
                insertParameters.Add(new OracleParameter("firstname", app.firstname == null ? "" : app.firstname));
                insertParameters.Add(new OracleParameter("middlename", app.middlename == null ? "" : app.middlename));
                insertParameters.Add(new OracleParameter("lastname", app.lastname == null ? "" : app.lastname));
                insertParameters.Add(new OracleParameter("address", app.address == null ? "" : app.address));
                insertParameters.Add(new OracleParameter("phonenumber", app.phonenumber == null ? "" : app.phonenumber));
                insertParameters.Add(new OracleParameter("usermajor", app.UserMajor == null ? "" : app.UserMajor));
                //insertParameters.Add(new OracleParameter("email", app.email == null ? "" : app.email));
                insertParameters.Add(new OracleParameter("username", username == null ? "" : username));//no need to use app.username. using token's username. shd be same
                insertParameters.Add(new OracleParameter("fund_acct", app.fund_acct == null ? "" : app.fund_acct));
                insertParameters.Add(new OracleParameter("essayfilename", app.essayfilename == null ? "" : app.essayfilename));
                insertParameters.Add(new OracleParameter("reffilename", app.reffilename == null ? "" : app.reffilename));
                insertParameters.Add(new OracleParameter("scholarshipyear", app.ScholarshipYear == null ? "" : app.ScholarshipYear));
                insertParameters.Add(new OracleParameter("expectedgraduation", app.ExpectedGraduation == null ? "" : app.ExpectedGraduation));
                insertParameters.Add(new OracleParameter("presentgpa", app.PresentGPA == null ? "" : app.PresentGPA));
                insertParameters.Add(new OracleParameter("highschoolgpa", app.HighSchoolGPA == null ? "" : app.HighSchoolGPA));
                insertParameters.Add(new OracleParameter("communityservice", app.CommunityService == null ? "" : app.CommunityService));
                insertParameters.Add(new OracleParameter("extracurricular", app.ExtraCurricular == null ? "" : app.ExtraCurricular));
                insertParameters.Add(new OracleParameter("awardshonors", app.AwardsHonors == null ? "" : app.AwardsHonors));
                insertParameters.Add(new OracleParameter("SCHLRSHP_NUM", app.SCHLRSHP_NUM == null ? "" : app.SCHLRSHP_NUM));
                insertParameters.Add(new OracleParameter("IsTransfer", app.IsTransfer == null ? "" : app.IsTransfer));
                insertParameters.Add(new OracleParameter("SchoolYear", app.SchoolYear == null ? "" : app.SchoolYear));

                int count = db.queryExecute(sqlstr, insertParameters);
                message = "Application Submitted";
            }
            else
            {
                message = "Application exists already";
            }
            return message;
        }
        /*  favs now in oracle
        public string ToggleFavoriteSQLServer(Favorite fav, string user)
        {
            string sqlstr = "SELECT * FROM favorites WHERE username=@username AND fund_acct=@fundacct";
            string message = "";
            DBObject db = new DBObject();
            List<SqlParameter> parameters = new List<SqlParameter>();
            parameters.Add(new SqlParameter("@username", user));
            parameters.Add(new SqlParameter("@fundacct", fav.fundacct));

            DataTable dt = db.querySQLServer(sqlstr, parameters);
            if (dt.Rows.Count == 0) //not a favorite, add it
            {
                sqlstr = "INSERT INTO favorites (username,fund_acct,frml_schlrshp_name) VALUES (@username,@fundacct, @schlrshpname)";
                List<SqlParameter> insertParameters = new List<SqlParameter>();
                insertParameters.Add(new SqlParameter("@username", user));
                insertParameters.Add(new SqlParameter("@fundacct", fav.fundacct));
                insertParameters.Add(new SqlParameter("@schlrshpname", fav.schlrshpname));
                //same parameter list applies
                int count = db.queryExecuteSQLServer(sqlstr, insertParameters);
                message = "Added to Favorites";
            }
            else
            { // a favorite already, delete it
                sqlstr = "DELETE FROM favorites WHERE username=@username AND fund_acct=@fundacct AND frml_schlrshp_name=@schlrshpname";
                List<SqlParameter> insertParameters = new List<SqlParameter>();
                insertParameters.Add(new SqlParameter("@username", user));
                insertParameters.Add(new SqlParameter("@fundacct", fav.fundacct));
                insertParameters.Add(new SqlParameter("@schlrshpname", fav.schlrshpname));
                //same parameter list applies
                int count = db.queryExecuteSQLServer(sqlstr, insertParameters);
                message = "Removed from Favorites";
            }
            return message;
        }
         * */
        public string ToggleFavorite(Favorite fav, string user)
        {
            string sqlstr = "SELECT * FROM scholarshipcenter.favorites WHERE username=:username AND fund_acct=:fundacct";
            string message = "";
            DBObject db = new DBObject();
            List<OracleParameter> parameters = new List<OracleParameter>();
            parameters.Add(new OracleParameter("username", user));
            parameters.Add(new OracleParameter("fundacct", fav.fundacct));

            DataTable dt = db.query(sqlstr, parameters);
            if (dt.Rows.Count == 0) //not a favorite, add it
            {
                sqlstr = "INSERT INTO scholarshipcenter.favorites (username,fund_acct,frml_schlrshp_name) VALUES (:username,:fundacct, :schlrshpname)";
                List<OracleParameter> insertParameters = new List<OracleParameter>();
                insertParameters.Add(new OracleParameter("username", user));
                insertParameters.Add(new OracleParameter("fundacct", fav.fundacct));
                insertParameters.Add(new OracleParameter("schlrshpname", fav.schlrshpname));
                //same parameter list applies
                int count = db.queryExecute(sqlstr, insertParameters);
                message = "Added to Favorites";
            }
            else
            { // a favorite already, delete it
                sqlstr = "DELETE FROM scholarshipcenter.favorites WHERE username=:username AND fund_acct=:fundacct AND frml_schlrshp_name=:schlrshpname";
                List<OracleParameter> insertParameters = new List<OracleParameter>();
                insertParameters.Add(new OracleParameter("username", user));
                insertParameters.Add(new OracleParameter("fundacct", fav.fundacct));
                insertParameters.Add(new OracleParameter("schlrshpname", fav.schlrshpname));
                //same parameter list applies
                int count = db.queryExecute(sqlstr, insertParameters);
                message = "Removed from Favorites";
            }
            return message;
        }
        /* favs now in oracle
        public string RemoveFavorite(Favorite fav, UserModel user)
        {
            
            string sqlstr = "DELETE FROM favorites WHERE username=@username AND fund_acct=@fundacct";
            string message = "";
            DBObject db = new DBObject();
            List<SqlParameter> parameters = new List<SqlParameter>();
            parameters.Add(new SqlParameter("@username", user.UserName));
            parameters.Add(new SqlParameter("@fundacct", fav.fundacct));

            int count = db.queryExecuteSQLServer(sqlstr, parameters);
            message = "Deleted.";
            return message;
        }
        */
        /*TODO: Deprecate below due to .net identity */
        public string generateToken(UserModel user)
        {
            string token = Convert.ToBase64String(Guid.NewGuid().ToByteArray());
            DBObject db = new DBObject();
            String sqlstr = "INSERT INTO scholarshipcenter.tokens (UserName,accesstoken,granted) VALUES (:UserName, :accesstoken,:granted)";
            List<OracleParameter> parameters = new List<OracleParameter>();
            parameters.Add(new OracleParameter("UserName", user.UserName));
            parameters.Add(new OracleParameter("accesstoken", token));
            parameters.Add(new OracleParameter("granted", DateTime.Now));
            int count = db.queryExecute(sqlstr, parameters);
            return token;
        }
        public static string generateTokenNoDB(UserModel user)
        {
            string token = Convert.ToBase64String(Guid.NewGuid().ToByteArray());
            return token;
        }
        public UserModel CheckToken(string token)
        {
            DBObject db = new DBObject();
            string sqlstr = "SELECT UserName FROM scholarshipcenter.tokens WHERE accesstoken= :accesstoken"; //and granted...
            List<OracleParameter> parameters = new List<OracleParameter>();
            parameters.Add(new OracleParameter("accesstoken", token));
            DataTable dt = db.query(sqlstr, parameters);
            if (dt.Rows.Count == 0)
                return null;
            else
            {
                UserModel user = new UserModel();
                user.UserName = dt.Rows[0]["UserName"].ToString();
                return GetUser(user); // dt.Rows[0]["username"].ToString();
            }

        }
        public UserModel GetUserFromToken()
        {
            HttpContext httpContext = HttpContext.Current;
            NameValueCollection headerList = httpContext.Request.Headers;
            string authorizationField = headerList.Get("Authorization");
            UserModel user = null;
            if (authorizationField != null)
            {
                authorizationField = authorizationField.Replace("Bearer ", "");
                user = this.CheckToken(authorizationField);
                System.Diagnostics.Debug.WriteLine(authorizationField);
                System.Diagnostics.Debug.WriteLine(user.UserName);
            }
            return user;

        }
        private string CreateSalt(int size)
        {
            //Generate a cryptographic random number.
            RNGCryptoServiceProvider rng = new RNGCryptoServiceProvider();
            byte[] buff = new byte[size];
            rng.GetBytes(buff);

            // Return a Base64 string representation of the random number.
            return Convert.ToBase64String(buff);
        }

        private string CreatePasswordHash(string pwd, string salt)
        {
            string saltAndPwd = String.Concat(pwd, salt);
            byte[] saltAndPwdbytes = System.Text.Encoding.Unicode.GetBytes(saltAndPwd);
            var sha = new SHA1Managed();
            string hashedPwd = Convert.ToBase64String(sha.ComputeHash(Convert.FromBase64String(Convert.ToBase64String(saltAndPwdbytes)))); //FormsAuthentication.HashPasswordForStoringInConfigFile(saltAndPwd, "sha1");
            return hashedPwd;
        }
        /*TODO END DEPRECATE */

        internal ScholarshipApp GetApplication(string fund_acct, UserModel user)
        {
            DBObject db = new DBObject();
            String sqlstr = "SELECT * FROM scholarshipcenter.applications WHERE username= ;username AND fund_acct=:fund_acct";
            List<OracleParameter> parameters = new List<OracleParameter>();
            parameters.Add(new OracleParameter("username", user.UserName));
            parameters.Add(new OracleParameter("fund_acct", fund_acct));
            DataTable dt = db.query(sqlstr, parameters);
            ScholarshipApp application=retrieveApplicationData(dt);
            return application;
        }

        internal ScholarshipApp GetApplication(long id)
        {
            DBObject db = new DBObject();
            String sqlstr = "SELECT * FROM scholarshipcenter.applications where id= :id";
            List<OracleParameter> parameters = new List<OracleParameter>();
            parameters.Add(new OracleParameter("id", id));
            DataTable dt = db.query(sqlstr, parameters);
            ScholarshipApp application=retrieveApplicationData(dt);
            return application;
        }
        internal Message SaveApplication(ScholarshipApp app)
        {
            DBObject db = new DBObject();
            String sqlstr = "UPDATE scholarshipcenter.applications SET remark=:remark, status=:status WHERE id=" + app.id.ToString(); //TODO: WHY "invalid number" error in oracle if i use :id
            List<OracleParameter> parameters = new List<OracleParameter>();
            //parameters.Add(new OracleParameter("appid", "1"));
            parameters.Add(new OracleParameter("remark", app.remark));
            parameters.Add(new OracleParameter("status", app.status));
            db.queryExecute(sqlstr, parameters);
            Message message = new Message();
            message.title = "Application Status saved";
            message.body= "Application Status saved";
            return message;
        }
        internal Message SaveProfile(UserModel userFromDB, UserModel userNewDetails)
        {
       

            DBObject db = new DBObject();
            String sqlstr = "UPDATE scholarshipcenter.manualusers SET firstname=:firstname, middlename=:middlename, lastname=:lastname,universityid=:universityid,phonenumber=:phonenumber,usermajor=:usermajor,presentgpa=:presentgpa,highschoolgpa=:highschoolgpa,communityservice=:communityservice,extracurricular=:extracurricular,address=:address,SchoolYear=:SchoolYear,IsTransfer=:IsTransfer WHERE username=:username";
            List<OracleParameter> parameters = new List<OracleParameter>();
            //parameters.Add(new OracleParameter("appid", "1"));
            parameters.Add(new OracleParameter("firstname", userNewDetails.FirstName));
            parameters.Add(new OracleParameter("middlename", userNewDetails.MiddleName));
            parameters.Add(new OracleParameter("lastname", userNewDetails.LastName));
            parameters.Add(new OracleParameter("universityid", userNewDetails.UniversityId));
            parameters.Add(new OracleParameter("phonenumber", userNewDetails.PhoneNumber));
            parameters.Add(new OracleParameter("usermajor", userNewDetails.UserMajor));
            parameters.Add(new OracleParameter("presentgpa", userNewDetails.PresentGPA));
            parameters.Add(new OracleParameter("highschoolgpa", userNewDetails.HighSchoolGPA));
            parameters.Add(new OracleParameter("communityservice", userNewDetails.CommunityService));
            parameters.Add(new OracleParameter("extracurricular", userNewDetails.ExtraCurricular));
            parameters.Add(new OracleParameter("address", userNewDetails.Address));            
            parameters.Add(new OracleParameter("SchoolYear", userNewDetails.SchoolYear));
            parameters.Add(new OracleParameter("IsTransfer", userNewDetails.IsTransfer));
            parameters.Add(new OracleParameter("username", userFromDB.UserName));
            db.queryExecute(sqlstr, parameters);
            System.Diagnostics.Debug.WriteLine(sqlstr);
            Message message = new Message();
            message.title = "Profile updated";
            message.body= "Profile updated";
            return message;
        }        
        private ScholarshipApp retrieveApplicationData(DataTable dt ){
            ScholarshipApp application=null;
            if (dt.Rows.Count != 0)
            {
                int i = 0;
                application = new ScholarshipApp();
                application.id = long.Parse(dt.Rows[i]["id"].ToString());
                application.UniversityId = dt.Rows[i]["universityid"].ToString().Trim();
                application.UserMajor = dt.Rows[i]["usermajor"].ToString().Trim();
                application.firstname = dt.Rows[i]["firstname"].ToString().Trim();
                application.lastname = dt.Rows[i]["lastname"].ToString().Trim();
                application.middlename = dt.Rows[i]["middlename"].ToString().Trim();
                application.address = dt.Rows[i]["address"].ToString().Trim();
                application.phonenumber = dt.Rows[i]["phonenumber"].ToString().Trim();
                //application.email = dt.Rows[i]["email"].ToString().Trim();
                application.fund_acct = dt.Rows[i]["fund_acct"].ToString().Trim();
                application.UserName = dt.Rows[i]["username"].ToString().Trim();
                application.essayfilename = dt.Rows[i]["essayfilename"].ToString().Trim();
                application.reffilename = dt.Rows[i]["reffilename"].ToString().Trim();
                application.ScholarshipYear = dt.Rows[i]["scholarshipyear"].ToString().Trim();
                application.remark = dt.Rows[i]["remark"].ToString().Trim();
                application.status = dt.Rows[i]["status"].ToString().Trim();
                application.ExpectedGraduation = dt.Rows[i]["expectedgraduation"].ToString().Trim();
                application.PresentGPA = dt.Rows[i]["presentgpa"].ToString().Trim();
                application.HighSchoolGPA= dt.Rows[i]["highschoolgpa"].ToString().Trim();
                application.CommunityService = dt.Rows[i]["communityservice"].ToString().Trim();
                application.ExtraCurricular = dt.Rows[i]["extracurricular"].ToString().Trim();
                application.AwardsHonors = dt.Rows[i]["awardshonors"].ToString().Trim();
                application.SchoolYear = dt.Rows[i]["SchoolYear"].ToString().Trim();
                application.IsTransfer = dt.Rows[i]["IsTransfer"].ToString().Trim();
                application.SCHLRSHP_NUM = dt.Rows[i]["SCHLRSHP_NUM"].ToString().Trim();
                //System.Diagnostics.Debug.WriteLine("Row : " + i.ToString());
            }
            return application;
        }

    }
}