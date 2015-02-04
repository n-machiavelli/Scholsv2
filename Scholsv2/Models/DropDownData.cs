using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Schols.Models
{
    public class DropDownData
    {
        public List<Department> departments;
        public List<College> colleges;
        public List<SchoolYear> schoolyears;
        public List<string> majors;
        //public List<ScholarshipLink> FeaturedScholarships; //TODO: should change name of class to MasterPageData 
    }
}