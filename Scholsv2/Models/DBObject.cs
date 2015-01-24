﻿﻿using OfficeOpenXml;
using OfficeOpenXml.Style;
using Oracle.ManagedDataAccess.Client;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Drawing;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Web;


namespace Schols.Models
{
    public class DBObject
    {
        OracleConnection cn;
        string ConnectionString;
        //string SQLConnString="Data Source=.; Integrated Security=true; Initial Catalog=manualowin";
        string SQLConnString= ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
        public string OracleConnString(string host, string port, string servicename, string user, string pass)
        {
            return String.Format(
              "Data Source=(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST={0})" +
              "(PORT={1}))(CONNECT_DATA=(SID={2})(SERVER=DEDICATED)));User Id={3};Password={4};",
              host,
              port,
              servicename,
              user,
              pass);
        }
        
        public DataTable query(string sqlstr, List<OracleParameter> parameters)
        {

            ConnectionString = OracleConnString("atoraagilon01.at.illinoisstate.edu", "1521", "ONEPRD", "BUAJOKU", "Hu481919");
            //ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["ScholarshipsEntities"].ConnectionString;
            DataTable dt = new DataTable();
            //TODO: Catch connection exceptions
            using (OracleConnection conn = new OracleConnection(ConnectionString)) // connect to oracle
            {
                conn.Open(); // open the oracle connection
                using (OracleCommand comm = new OracleCommand(sqlstr, conn)) // create the oracle sql command
                {
                    if (parameters != null)
                    {
                        foreach (OracleParameter parameter in parameters)
                        {
                            comm.Parameters.Add(parameter);
                            System.Diagnostics.Debug.WriteLine("Param and val");
                            System.Diagnostics.Debug.Write(parameter.ParameterName);
                            System.Diagnostics.Debug.Write(parameter.Value);
                        }

                    }
                    System.Diagnostics.Debug.WriteLine(comm.CommandText);
                    using (OracleDataAdapter myadapter = new OracleDataAdapter())
                    {
                        myadapter.SelectCommand = comm;
                        myadapter.Fill(dt);
                    }
                    comm.Dispose();
                }
                conn.Close(); // close the oracle connection
            }
            return dt;
        }
        public int queryExecute(string sqlstr, List<OracleParameter> parameters)
        {

            ConnectionString = OracleConnString("atoraagilon01.at.illinoisstate.edu", "1521", "ONEPRD", "BUAJOKU", "Hu481919");
            //ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["ScholarshipsEntities"].ConnectionString;
            int result = 0;

            using (OracleConnection conn = new OracleConnection(ConnectionString)) // connect to oracle
            {
                conn.Open(); // open the oracle connection
                using (OracleCommand comm = new OracleCommand(sqlstr, conn)) // create the oracle sql command
                {
                    if (parameters != null)
                    {
                        foreach (OracleParameter parameter in parameters)
                        {
                            comm.Parameters.Add(parameter);
                            System.Diagnostics.Debug.WriteLine("Param and val");
                            System.Diagnostics.Debug.Write(parameter.ParameterName);
                            System.Diagnostics.Debug.Write(parameter.Value);
                        }
                    }
                    result = comm.ExecuteNonQuery();
                    comm.Dispose();
                }
                conn.Close(); // close the oracle connection
            }
            return result;
        }
        public DropDownData GetDropDownData()
        {
            DropDownData dropdownData = new DropDownData();
            dropdownData.majors = GetDistinctMajors();
            //dropdownData.colleges = GetColleges();
            //dropdownData.departments = GetDepartments();
            dropdownData.schoolyears = GetSchoolYears();
            return dropdownData;
        }

        public List<Department> GetDepartments()
        {
            string sqlstr = "SELECT * FROM UHELP.FUND_DEPT_ATTRB";

            DataTable dt = query(sqlstr, null);
            List<Department> departmentList = new List<Department>();
            Department aDepartment;
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                aDepartment = new Department();
                Type t = aDepartment.GetType();
                foreach (PropertyInfo info in t.GetProperties())
                {
                    if (!DBNull.Value.Equals(dt.Rows[i][info.Name])) info.SetValue(aDepartment, dt.Rows[i][info.Name]);
                }
                departmentList.Add(aDepartment);
            }

            return departmentList;
        }
        public List<College> GetColleges()
        {
            string sqlstr = "SELECT * FROM UHELP.FUND_COLL_ATTRB";
            DataTable dt = query(sqlstr, null);
            List<College> collegeList = new List<College>();
            College aCollege;

            for (int i = 0; i < dt.Rows.Count; i++)
            {
                aCollege = new College();
                Type t = aCollege.GetType();
                foreach (PropertyInfo info in t.GetProperties())
                {
                    if (!DBNull.Value.Equals(dt.Rows[i][info.Name])) info.SetValue(aCollege, dt.Rows[i][info.Name]);
                }
                collegeList.Add(aCollege);

            }
            return collegeList;
        }
        public List<SchoolYear> GetSchoolYears()
        {
            string sqlstr = "select * from uhelp.user_cd where USER_GRP LIKE '%SCHYR%'";
            DataTable dt = query(sqlstr, null);
            List<SchoolYear> schoolYears = new List<SchoolYear>();
            SchoolYear schoolYear;

            for (int i = 0; i < dt.Rows.Count; i++)
            {
                schoolYear = new SchoolYear();
                Type t = schoolYear.GetType();
                foreach (PropertyInfo info in t.GetProperties())
                {
                    if (!DBNull.Value.Equals(dt.Rows[i][info.Name])) info.SetValue(schoolYear, dt.Rows[i][info.Name]);
                }
                schoolYears.Add(schoolYear);

            }
            return schoolYears;
        }
        public List<string> GetDistinctMajors()
        {
            string sqlstr = "SELECT DISTINCT USER_CD_DESCR FROM UHELP.USER_CD WHERE UHELP.USER_CD.USER_GRP='SCHMJ' ORDER BY USER_CD_DESCR";
            DataTable dt = query(sqlstr, null);
            List<string> majorsList = new List<string>();
            Major major ;
            string strMajor;
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                major = new Major();
                strMajor = "";
                Type t = major.GetType();
                foreach (PropertyInfo info in t.GetProperties())
                {
                    if (!DBNull.Value.Equals(dt.Rows[i][info.Name]))
                    {
                        info.SetValue(major, dt.Rows[i][info.Name]);
                        strMajor = major.USER_CD_DESCR;
                    }
                }
                majorsList.Add(strMajor);
            }
            return majorsList;
        }

        public ScholarshipData GetScholarshipData(string fundAcct, string scholarNum)
        {
            string sqlstr = "SELECT * FROM summit.schlrshp s inner join SUMMIT.FUND f ON S.FUND_ACCT=F.FUND_ACCT LEFT OUTER JOIN UHELP.FUND_COLL_ATTRB coll on f.FUND_COLL_ATTRB=coll.FUND_COLL_ATTRB LEFT OUTER JOIN UHELP.FUND_DEPT_ATTRB dept on f.FUND_COLL_ATTRB=dept.FUND_DEPT_ATTRB ";
            sqlstr += " LEFT OUTER JOIN Summit.USER_CODE su on s.audit_tran_id=su.parent_audit_tran_id";
            sqlstr += " LEFT OUTER JOIN UHELP.USER_CD uu on su.USER_CD=UU.USER_CD ";
            sqlstr += " WHERE regexp_like(s.FUND_ACCT, :fundAcct, 'i')  AND regexp_like(s.SCHLRSHP_NUM, :scholarNum, 'i') AND s.SCHLR_USER_VARBL2 = 'Y' and f.FUND_OPEN_ATTRB='O'";
            //sqlstr += " AND (uu.USER_GRP='SCHMJ' or uu.USER_GRP='SCHYR' or uu.USER_GRP='SCHOT')";
            sqlstr += "AND ((s.audit_tran_id is not null and (uu.USER_GRP='SCHMJ' or uu.USER_GRP='SCHYR' or uu.USER_GRP='SCHOT' or uu.USER_GRP='SCHCO')) or s.audit_tran_id is null)";
            List<OracleParameter> parameters = new List<OracleParameter>();
            parameters.Add(new OracleParameter("fundAcct", fundAcct));
            parameters.Add(new OracleParameter("scholarNum", scholarNum));
            ScholarshipData data = new ScholarshipData();
            DataTable dt = query(sqlstr, parameters);
            List<Scholarship> ScholarshipList = new List<Scholarship>();
            Scholarship aScholarship;
            aScholarship = new Scholarship();
            aScholarship.Majors = new List<string>();
            aScholarship.SchoolYears = new List<string>();
            aScholarship.Miscellaneous = new List<string>();
            aScholarship.Counties = new List<string>();
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Type t = aScholarship.GetType();
                foreach (FieldInfo info in t.GetFields())
                {
                    if (!info.Name.Equals("Majors") && !info.Name.Equals("SchoolYears") && !info.Name.Equals("Miscellaneous") && !info.Name.Equals("Counties"))
                    {
                        if (!DBNull.Value.Equals(dt.Rows[i][info.Name]))
                        {
                            if (info.FieldType == typeof(string))
                            {
                                info.SetValue(aScholarship, dt.Rows[i][info.Name].ToString().Trim());
                            }
                            else
                            {
                                info.SetValue(aScholarship, dt.Rows[i][info.Name]);
                            }
                        }
                        else
                        {
                            if (info.FieldType == typeof(string)) info.SetValue(aScholarship, "");
                        }
                    }
                }
                if (dt.Rows[i]["USER_GRP"].ToString().Equals("SCHMJ") && !aScholarship.Majors.Contains(dt.Rows[i]["USER_CD_DESCR"].ToString().Trim()))
                {
                    aScholarship.Majors.Add(dt.Rows[i]["USER_CD_DESCR"].ToString().Trim());
                }
                if (dt.Rows[i]["USER_GRP"].ToString().Equals("SCHOT") && !aScholarship.Miscellaneous.Contains(dt.Rows[i]["NOTE"].ToString().Trim()))
                {
                    aScholarship.Miscellaneous.Add(dt.Rows[i]["NOTE"].ToString().Trim());
                }
                if (dt.Rows[i]["USER_GRP"].ToString().Equals("SCHYR") && !aScholarship.SchoolYears.Contains(dt.Rows[i]["USER_CD_DESCR"].ToString().Trim()))
                {
                    aScholarship.SchoolYears.Add(dt.Rows[i]["USER_CD_DESCR"].ToString().Trim());
                }
                if (dt.Rows[i]["USER_GRP"].ToString().Equals("SCHCO") && !aScholarship.Counties.Contains(dt.Rows[i]["USER_CD_DESCR"].ToString().Trim()))
                {
                    aScholarship.Counties.Add(dt.Rows[i]["USER_CD_DESCR"].ToString().Trim());
                }

                System.Diagnostics.Debug.WriteLine("Row : " + i.ToString() + ":" + aScholarship.FRML_SCHLRSHP_NAME);
                //ScholarshipList.Add(aScholarship);
            }
                data.Title = aScholarship.FRML_SCHLRSHP_NAME;
                data.Purpose = aScholarship.SCHLRSHP_PRPS;
                data.GradGPA = aScholarship.SCHLR_USER_VARBL14;
                data.UndergradGPA = aScholarship.SCHLR_USER_VARBL13;
                data.HighSchoolGPA = aScholarship.SCHLR_USER_VARBL15;
                data.FinancialNeed = aScholarship.SCHLR_USER_VARBL4.Length == 0 ? "" : "<b>Financial Need</b> : This scholarship requires a student to have a Financial Need to be eligible to receive the scholarship. In order to establish \"Financial Need\", a student must file the Free Application for Federal Student Aid (FAFSA). You can file the FAFSA at <a target='_blank' href=\"http://www.fafsa.ed.gov/\">www.fafsa.ed.gov</a>.";
                data.Essay = (aScholarship.SCHLR_USER_VARBL11.Length == 0) ? "There is no essay required for this scholarship" : "An Essay is required towards applying for this scholarship";
                data.International = (aScholarship.SCHLR_USER_VARBL3.ToLower().Equals("n")) ? "This scholarship is not open to International Students" : "";
                data.ReferenceLetter = (aScholarship.SCHLR_USER_VARBL31.Length == 0) ? "" : ("<b>Reference Letters : </b>" + aScholarship.SCHLR_USER_VARBL31 + " reference letter(s) needed.");
                data.IsuHours = aScholarship.SCHLR_USER_VARBL18;
                data.Leadership = ((aScholarship.SCHLR_USER_VARBL9.Length == 0 && !aScholarship.SCHLR_USER_VARBL9.Equals("N")) ? "" : "Leadership experience is required to apply for this scholarship");
                data.College=aScholarship.FUND_DEPT_DESCR;
                data.Department=aScholarship.FUND_COLL_DESCR;
                if (aScholarship.SCHLR_USER_VARBL32.Length > 0)
                {
                    String deadline = aScholarship.SCHLR_USER_VARBL32;
                    int x = Convert.ToInt32(deadline);
                    String y = CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(x);
                    data.Deadline = "<p><b>Application Deadline: </b>" + y + "</p>";
                }
                else
                {
                    data.Deadline = "<p><b>Application Deadline: </b> No deadline has been specified. </p>";
                }
                data.CommunityService = aScholarship.SCHLR_USER_VARBL8.Length == 0 ? "" : "<p><b>Community Service: </b>  There is a community service requirement in applying for this scholarship.</p>";
                data.Majors = aScholarship.Majors;
                data.SchoolYears = aScholarship.SchoolYears;
                data.Miscellaneous = aScholarship.Miscellaneous;
                data.Counties = aScholarship.Counties;
                //if (!DBNull.Value.Equals(dt.Rows[i]["FUND_DEPT_DESCR"])) data.department = dt.Rows[i]["FUND_DEPT_DESCR"].ToString();
                //else data.department = "";
                //if (!DBNull.Value.Equals(dt.Rows[i]["FUND_COLL_DESCR"])) data.college = dt.Rows[i]["FUND_COLL_DESCR"].ToString();
                //else data.college = "";
                //if (!DBNull.Value.Equals(dt.Rows[i]["FUND_DEPT_DESC"])) data.communityservice = dt.Rows[i]["FUND_DEPT_DESC"];
                //if (!DBNull.Value.Equals(dt.Rows[i]["FUND_DEPT_DESC"])) data.deadline = dt.Rows[i]["FUND_DEPT_DESC"];

                ///county...
            
            System.Diagnostics.Debug.WriteLine("sql : " + sqlstr);
            System.Diagnostics.Debug.WriteLine("params : " + fundAcct + ":" + scholarNum);
            System.Diagnostics.Debug.WriteLine("Data : " + data.Title);
            return data;

        }
        public DataTable GetApplicationsTable()
        {
            string sqlstr = "SELECT id,universityid,firstname,lastname,middlename,address,phonenumber,email,fund_acct,essayfilename,username,reffilename,scholarshipyear FROM applications "; //TODO: WHERE
            DataTable dt = querySQLServer(sqlstr, null);
            return dt;
        }

        public DataTable GetFavoritesTable(string user)
        {
            string sqlstr = "SELECT username, fund_acct,frml_schlrshp_name FROM favorites WHERE username=@username";
            List<SqlParameter> selectParameters = new List<SqlParameter>();
            selectParameters.Add(new SqlParameter("@username", user));
            DataTable dt = querySQLServer(sqlstr, selectParameters);
            return dt;
        }
        public DataTable GetScholarshipsTable(SearchObject searchObject)
        {
            //string sqlstr = "SELECT * FROM summit.schlrshp s inner join SUMMIT.FUND f ON S.FUND_ACCT=F.FUND_ACCT WHERE (FRML_SCHLRSHP_NAME like @title )";
            string sqlstr = "SELECT DISTINCT FRML_SCHLRSHP_NAME,s.FUND_ACCT,s.SCHLRSHP_NUM FROM summit.schlrshp s inner join SUMMIT.FUND f ON S.FUND_ACCT=F.FUND_ACCT LEFT OUTER JOIN UHELP.FUND_COLL_ATTRB coll on f.FUND_COLL_ATTRB=coll.FUND_COLL_ATTRB LEFT OUTER JOIN UHELP.FUND_DEPT_ATTRB dept on f.FUND_COLL_ATTRB=dept.FUND_DEPT_ATTRB ";
            sqlstr += "LEFT OUTER JOIN Summit.USER_CODE su on (s.audit_tran_id=su.parent_audit_tran_id and (su.USER_GRP='SCHMJ' or su.USER_GRP='SCHYR'))";
            sqlstr += "LEFT OUTER JOIN UHELP.USER_CD uu on su.USER_CD=UU.USER_CD ";
            sqlstr += " WHERE s.SCHLR_USER_VARBL2 = 'Y' and f.FUND_OPEN_ATTRB='O' AND rownum<3000 "; //explain this number later. choosing 3 cols also allows me have DISTINCT
            List<OracleParameter> parameters = new List<OracleParameter>();
            if (searchObject.title != null && !searchObject.title.Trim().Equals("")) //decided to allow for empty title after testing performance with toad. satisfactory for 1000 rows if selecting 3 cols
            {
                sqlstr += " AND regexp_like(FRML_SCHLRSHP_NAME, :title, 'i') ";
                parameters.Add(new OracleParameter("title", searchObject.title));
            }

            if (searchObject.college != null && !searchObject.college.Equals("-1"))
            {
                sqlstr += " and regexp_like(f.FUND_COLL_ATTRB, :college)" ; //  or f.FUND_COLL_ATTRB IS NULL OR f.FUND_COLL_ATTRB=''"; 
                //no need regex since we have dropdown for these
                //changed "like :college to =college" bcos like needs exact in case of '01        '. i need to be able to use '01'
                parameters.Add(new OracleParameter("college", searchObject.college));
            }
            if (searchObject.department != null && !searchObject.department.Equals("-1"))
            {
                sqlstr += " and f.FUND_DEPT_ATTRB like :department ";
                parameters.Add(new OracleParameter("department", searchObject.department));
            }
            if (searchObject.schoolYear != null && !searchObject.schoolYear.Equals("-1"))
            {
                sqlstr += " and uu.USER_CD like :year and su.USER_GRP='SCHYR'";
                parameters.Add(new OracleParameter("schoolYear", searchObject.schoolYear));
            }
            if (searchObject.major != null && !searchObject.major.Trim().Equals(""))
            {
                sqlstr += " and regexp_like(uu.USER_CD_DESCR, :major, 'i') and su.USER_GRP='SCHMJ' ";
                parameters.Add(new OracleParameter("major", searchObject.major));
            }
            if (searchObject.undergradGPA != null && !searchObject.undergradGPA.Trim().Equals(""))
            {
                sqlstr += " and CAST(SCHLR_USER_VARBL13 AS number) <= :undergradGPA ";
                parameters.Add(new OracleParameter("undergradGPA", searchObject.undergradGPA));
            }
            if (searchObject.gradGPA != null && !searchObject.gradGPA.Trim().Equals(""))
            {
                sqlstr += " and CAST(SCHLR_USER_VARBL14 AS number) <= :gradGPA ";
                parameters.Add(new OracleParameter("gradGPA", searchObject.gradGPA));
            }
            if (searchObject.highschoolGPA != null && !searchObject.highschoolGPA.Trim().Equals(""))
            {
                sqlstr += " and CAST(SCHLR_USER_VARBL15 AS number) <= :highschoolGPA ";
                parameters.Add(new OracleParameter("highschoolGPA", searchObject.highschoolGPA));
            }
            if (searchObject.keyword != null && !searchObject.keyword.Trim().Equals(""))
            {
                sqlstr += " and (regexp_like(FRML_SCHLRSHP_NAME, :keyword,'i') or regexp_like(SCHLRSHP_PRPS, :keyword,'i') or regexp_like(SCHLRSHP_CRTRIA,:keyword,'i')";
                sqlstr += " or regexp_like(uu.USER_CD_DESCR, :keyword,'i') or regexp_like(f.FUND_DEPT_ATTRB, :keyword,'i') or regexp_like(f.FUND_COLL_ATTRB, :keyword,'i') )";
                parameters.Add(new OracleParameter("keyword", searchObject.keyword));
            }
            System.Diagnostics.Debug.WriteLine(sqlstr);
            DataTable dt = query(sqlstr, parameters);
            System.Diagnostics.Debug.WriteLine(dt.Rows.Count);
            return dt;
        }
        public List<ScholarshipLink> GetScholarshipsWithFavorites(SearchObject searchObject, string user)
        {
            /* This temporary ineffective fxn will be replaced when favorites table is moved to oracle db to allow joins... */
            DataTable dtScholarships = GetScholarshipsTable(searchObject);
            DataTable dtFavorites = GetFavoritesTable(user);
            List<ScholarshipLink> ScholarshipList = new List<ScholarshipLink>();
            ScholarshipLink aScholarship;
            dtScholarships.Columns.Add("fav");
            for (int i=0; i<dtScholarships.Rows.Count; i++)
            {
                for (int j=0;j<dtFavorites.Rows.Count; j++)
                {
                    System.Diagnostics.Debug.WriteLine(dtFavorites.Rows[j]["fund_acct"].ToString() + ":::" + dtScholarships.Rows[i]["FUND_ACCT"].ToString());
                    if (dtFavorites.Rows[j]["fund_acct"].ToString().Trim().Equals(dtScholarships.Rows[i]["FUND_ACCT"].ToString().Trim()))
                    {
                        dtScholarships.Rows[i]["fav"] = "yes";
                        System.Diagnostics.Debug.Write("YES");
                    }
                    else
                    {
                        System.Diagnostics.Debug.Write("NO");
                    }
                }
                aScholarship = new ScholarshipLink();
                aScholarship.SCHLRSHP_NUM = dtScholarships.Rows[i]["SCHLRSHP_NUM"].ToString().Trim();
                aScholarship.FUND_ACCT = dtScholarships.Rows[i]["FUND_ACCT"].ToString().Trim();
                aScholarship.FRML_SCHLRSHP_NAME = dtScholarships.Rows[i]["FRML_SCHLRSHP_NAME"].ToString().Trim();
                aScholarship.fav = dtScholarships.Rows[i]["fav"].ToString();
                ScholarshipList.Add(aScholarship);
            }
            return ScholarshipList;
            /*
            var result = from x in dtScholarships.AsEnumerable()
             join y in dtFavorites.AsEnumerable() on x["FUND_ACCT"] equals y["fund_acct"] into DataGroup                         
             from item in DataGroup.DefaultIfEmpty()
             select new {
                            FUND_ACCT=x["FUND_ACCT"],
                            FRML_SCHLRSHP_NAME=x["FRML_SCHLRSHP_NAME"]
                            //USERNAME=y["username"]
                            //SOMETHING = item == null ? string.Empty : item["username"]
                        };
            foreach (var s in result)
                System.Diagnostics.Debug.WriteLine(s);
            return null;
            
            var resultingTable = from t1 in dtScholarships.AsEnumerable()
                     join t2 in dtFavorites.AsEnumerable() 
                         on t1.Field<string>("FUND_ACCT") equals t2.Field<string>("fund_acct")
                     select new { t1, t2 };
                     
                    // Now with the results of the query fill in the columns of the new DataTable
                    foreach(var dr in resultingTable)
                    {
                        DataRow newRow = newDataTable.NewRow();
                        // Now fill the row with the value from the query t1
                        newRow["ColumnName1"] = dr.t1.Field<DataType of Column>("ColumnName1");
                        // ... Continue with all the columns from t1 in the same way
                        
                        // Now fill the row with the value from the query t2
                        // In the same way as above
                        
                        // When all columns have been filled in then add the row to the table
                        newDataTable.Rows.Add(newRow);
                    } 
             * */
        }

        public List<ScholarshipLink> GetScholarships(SearchObject searchObject)
        {
            DataTable dt = GetScholarshipsTable(searchObject);
            List<ScholarshipLink> ScholarshipList = new List<ScholarshipLink>();
            ScholarshipLink aScholarship;
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                aScholarship = new ScholarshipLink();
                Type t = aScholarship.GetType();
                aScholarship.SCHLRSHP_NUM = dt.Rows[i]["SCHLRSHP_NUM"].ToString().Trim();
                aScholarship.FUND_ACCT = dt.Rows[i]["FUND_ACCT"].ToString().Trim();
                aScholarship.FRML_SCHLRSHP_NAME = dt.Rows[i]["FRML_SCHLRSHP_NAME"].ToString().Trim();
                //System.Diagnostics.Debug.WriteLine("Row : " + i.ToString() + ":" + aScholarship.FRML_SCHLRSHP_NAME);
                //System.Diagnostics.Debug.WriteLine("Row : " + i.ToString());
                ScholarshipList.Add(aScholarship);

            }
            return ScholarshipList;
        }

        public Message GenerateAppsExcel()
        {
            DataTable dt = GetApplicationsTable();
            List<ScholarshipApp> applications = new List<ScholarshipApp>();
            ScholarshipApp application;
            string file = "";
            using (ExcelPackage p = new ExcelPackage())
            {
                p.Workbook.Properties.Author = "Scholarship Finder";
                p.Workbook.Properties.Title = "Applications List";
                //Create a sheet
                p.Workbook.Worksheets.Add("Sample WorkSheet");
                ExcelWorksheet ws = p.Workbook.Worksheets[1];
                ws.Name = "Sample Worksheet"; //Setting Sheet's name
                ws.Cells.Style.Font.Size = 11; //Default font size for whole sheet
                ws.Cells.Style.Font.Name = "Calibri"; //Default Font name for whole sheet
                //Merging cells and create a center heading for out table
                ws.Cells[1, 1].Value = "Sample DataTable Export";
                ws.Cells[1, 1, 1, dt.Columns.Count].Merge = true;
                ws.Cells[1, 1, 1, dt.Columns.Count].Style.Font.Bold = true;
                ws.Cells[1, 1, 1, dt.Columns.Count].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                int colIndex = 1;
                int rowIndex = 2;
                foreach (DataColumn dc in dt.Columns) //Creating Headings
                {
                    var cell = ws.Cells[rowIndex, colIndex];

                    //Setting the background color of header cells to Gray
                    var fill = cell.Style.Fill;
                    fill.PatternType = ExcelFillStyle.Solid;
                    fill.BackgroundColor.SetColor(Color.Gray);


                    //Setting Top/left,right/bottom borders.
                    var border = cell.Style.Border;
                    border.Bottom.Style =
                        border.Top.Style =
                        border.Left.Style =
                        border.Right.Style = ExcelBorderStyle.Thin;

                    //Setting Value in cell
                    cell.Value = dc.ColumnName;

                    colIndex++;
                }
                var namedStyle = p.Workbook.Styles.CreateNamedStyle("HyperLink");   //This one is language dependent
                namedStyle.Style.Font.UnderLine = true;
                namedStyle.Style.Font.Color.SetColor(Color.Blue);
                foreach (DataRow dr in dt.Rows) // Adding Data into rows
                {
                    colIndex = 1;
                    rowIndex++;
                    foreach (DataColumn dc in dt.Columns)
                    {
                        var cell = ws.Cells[rowIndex, colIndex];
                        //Setting Value in cell
                        
                        if (dc.ColumnName.Equals("reffilename") || dc.ColumnName.Equals("essayfilename"))
                        {
                            cell.Hyperlink = new Uri("http://localhost:2382/api/Upload/" + dr["username"] + "/" + dr[dc.ColumnName].ToString());
                            cell.Value = dr[dc.ColumnName];
                            cell.StyleName = "HyperLink";
                            System.Diagnostics.Debug.WriteLine(cell.Text);
                            //ws.Cells[rowIndex, colIndex].Hyperlink = new ExcelHyperLink(, dr[dc.ColumnName].ToString());
                            //cell.Value = dr[dc.ColumnName];
                        }else{
                            cell.Value = dr[dc.ColumnName];//Convert.ToInt32(dr[dc.ColumnName]);
                        }
                        

                        //Setting borders of cell
                        var border = cell.Style.Border;
                        border.Left.Style =
                            border.Right.Style = ExcelBorderStyle.Thin;
                        colIndex++;
                    }
                }
                /*
                    colIndex = 0;
                    foreach (DataColumn dc in dt.Columns) //Creating Headings
                    {
                        colIndex++;
                        var cell = ws.Cells[rowIndex, colIndex];

                        //Setting Sum Formula
                        cell.Formula = "Sum(" +
                                        ws.Cells[3, colIndex].Address +
                                        ":" +
                                        ws.Cells[rowIndex - 1, colIndex].Address +
                                        ")";

                        //Setting Background fill color to Gray
                        cell.Style.Fill.PatternType = ExcelFillStyle.Solid;
                        cell.Style.Fill.BackgroundColor.SetColor(Color.Gray);
                    }
                */
                    //Generate A File with Random name
                    Byte[] bin = p.GetAsByteArray();
                    HttpContext httpContext = HttpContext.Current;
                    string Serverpath = httpContext.Server.MapPath("ExcelUploads");
                    if (!Directory.Exists(Serverpath))
                        Directory.CreateDirectory(Serverpath);

                    string fileDirectory = Serverpath;
                    file = Guid.NewGuid().ToString() + ".xlsx";
                    fileDirectory = Serverpath + "\\" + file;

                    File.WriteAllBytes(fileDirectory, bin);
                /*
                    application = new ScholarshipApp();
                    application.universityid = dt.Rows[i]["universityid"].ToString().Trim();
                    application.firstname = dt.Rows[i]["firstname"].ToString().Trim();
                    application.lastname = dt.Rows[i]["lastname"].ToString().Trim();
                    application.middlename = dt.Rows[i]["middlename"].ToString().Trim();
                    application.address = dt.Rows[i]["address"].ToString().Trim();
                    application.phonenumber = dt.Rows[i]["phonenumber"].ToString().Trim();
                    application.email = dt.Rows[i]["email"].ToString().Trim();
                    application.fund_acct = dt.Rows[i]["fund_acct"].ToString().Trim();
                    application.username = dt.Rows[i]["username"].ToString().Trim();
                    application.essayfilename = dt.Rows[i]["essayfilename"].ToString().Trim();
                    application.reffilename = dt.Rows[i]["reffilename"].ToString().Trim();
                    application.scholarshipyear = dt.Rows[i]["scholarshipyear"].ToString().Trim();
                    //System.Diagnostics.Debug.WriteLine("Row : " + i.ToString());
                    applications.Add(application);
                    */
            }
            Message message=new Message();
            message.body=file;
            message.title="Successful";
            return message;
        }
        public List<ScholarshipApp> GetApplications()
        {
            DataTable dt = GetApplicationsTable();
            List<ScholarshipApp> applications = new List<ScholarshipApp>();
            ScholarshipApp application;
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                application = new ScholarshipApp();
                application.id = long.Parse(dt.Rows[i]["id"].ToString());
                application.universityid = dt.Rows[i]["universityid"].ToString().Trim();
                application.firstname = dt.Rows[i]["firstname"].ToString().Trim();
                application.lastname = dt.Rows[i]["lastname"].ToString().Trim();
                application.middlename = dt.Rows[i]["middlename"].ToString().Trim();
                application.address = dt.Rows[i]["address"].ToString().Trim();
                application.phonenumber = dt.Rows[i]["phonenumber"].ToString().Trim();
                application.email = dt.Rows[i]["email"].ToString().Trim();
                application.fund_acct = dt.Rows[i]["fund_acct"].ToString().Trim();
                application.username = dt.Rows[i]["username"].ToString().Trim();
                application.essayfilename = dt.Rows[i]["essayfilename"].ToString().Trim();
                application.reffilename = dt.Rows[i]["reffilename"].ToString().Trim();
                application.scholarshipyear = dt.Rows[i]["scholarshipyear"].ToString().Trim();
                //System.Diagnostics.Debug.WriteLine("Row : " + i.ToString());
                applications.Add(application);

            }
            return applications;
        }

        public List<ScholarshipLink> GetFavoriteScholarships(string user)
        {
            DataTable dt = GetFavoritesTable(user);
            List<ScholarshipLink> ScholarshipList = new List<ScholarshipLink>();
            ScholarshipLink aScholarship;
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                aScholarship = new ScholarshipLink();
                Type t = aScholarship.GetType();
                //aScholarship.SCHLRSHP_NUM = dt.Rows[i]["schlrshp_num"].ToString().Trim();  //TODO: Confirm relevance of this column
                aScholarship.FUND_ACCT = dt.Rows[i]["fund_acct"].ToString().Trim();
                aScholarship.FRML_SCHLRSHP_NAME = dt.Rows[i]["frml_schlrshp_name"].ToString().Trim();
                //System.Diagnostics.Debug.WriteLine("Row : " + i.ToString() + ":" + aScholarship.FRML_SCHLRSHP_NAME);
                //System.Diagnostics.Debug.WriteLine("Row : " + i.ToString());
                ScholarshipList.Add(aScholarship);

            }
            return ScholarshipList;
        }

        /* sql server */
        public DataTable querySQLServer(string sqlstr, List<SqlParameter> parameters)
        {

            DataTable dt = new DataTable();
            using (SqlConnection conn = new SqlConnection(SQLConnString)) // connect to oracle
            {
                conn.Open(); // open the oracle connection
                using (SqlCommand comm = new SqlCommand(sqlstr, conn)) // create the oracle sql command
                {
                    if (parameters != null)
                    {
                        foreach (SqlParameter parameter in parameters)
                        {
                            comm.Parameters.Add(parameter);
                            System.Diagnostics.Debug.WriteLine("Param and val");
                            System.Diagnostics.Debug.Write(parameter.ParameterName);
                            System.Diagnostics.Debug.Write(parameter.Value);
                        }

                    }
                    System.Diagnostics.Debug.WriteLine(comm.CommandText);
                    using (SqlDataAdapter myadapter = new SqlDataAdapter())
                    {
                        myadapter.SelectCommand = comm;
                        myadapter.Fill(dt);
                    }
                    comm.Dispose();
                }
                conn.Close(); // close the oracle connection
            }
            return dt;
        }
        public int queryExecuteSQLServer(string sqlstr, List<SqlParameter> parameters)
        {

            int result = 0;
            using (SqlConnection conn = new SqlConnection(SQLConnString)) // connect to oracle
            {
                conn.Open(); // open the oracle connection
                using (SqlCommand comm = new SqlCommand(sqlstr, conn)) // create the oracle sql command
                {
                    System.Diagnostics.Debug.Write(sqlstr);
                    if (parameters != null)
                    {
                        foreach (SqlParameter parameter in parameters)
                        {
                            comm.Parameters.Add(parameter);
                            System.Diagnostics.Debug.WriteLine("Param and val");
                            System.Diagnostics.Debug.Write(parameter.ParameterName);
                            System.Diagnostics.Debug.Write(parameter.Value);
                        }
                    }
                    result = comm.ExecuteNonQuery();
                    comm.Dispose();
                }
                conn.Close(); // close the oracle connection
            }
            return result;
        }

    }

}