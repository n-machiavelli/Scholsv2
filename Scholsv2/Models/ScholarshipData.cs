using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Schols.Models
{
    public class ScholarshipData
    {
        public string Title { get; set; }
        public string Purpose { get; set; }
        public string Department { get; set; }
        public string College { get; set; }
        public string SchoolYear { get; set; }
        public string Major { get; set; }
        public string UndergradGPA { get; set; }
        public string GradGPA { get; set; }
        public string HighSchoolGPA { get; set; }
        public string Essay { get; set; }
        public string Deadline { get; set; }
        public string FinancialNeed { get; set; }
        public string International { get; set; }
        public string CommunityService { get; set; }
        public string ReferenceLetter { get; set; }
        public string IsuHours { get; set; }
        public string Leadership { get; set; }
        public List<string> Majors;
        public List<string> Miscellaneous;
        public List<string> SchoolYears;
        public List<string> Counties;

    }
}