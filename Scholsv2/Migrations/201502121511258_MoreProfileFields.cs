namespace Scholsv2.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class MoreProfileFields : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.AspNetUsers", "PresentGPA", c => c.String(maxLength: 4000));
            AddColumn("dbo.AspNetUsers", "HighSchoolGPA", c => c.String(maxLength: 4000));
            AddColumn("dbo.AspNetUsers", "CommunityService", c => c.String(maxLength: 4000));
            AddColumn("dbo.AspNetUsers", "ExtraCurricular", c => c.String(maxLength: 4000));
            AddColumn("dbo.AspNetUsers", "Address", c => c.String(maxLength: 4000));
        }
        
        public override void Down()
        {
            DropColumn("dbo.AspNetUsers", "Address");
            DropColumn("dbo.AspNetUsers", "ExtraCurricular");
            DropColumn("dbo.AspNetUsers", "CommunityService");
            DropColumn("dbo.AspNetUsers", "HighSchoolGPA");
            DropColumn("dbo.AspNetUsers", "PresentGPA");
        }
    }
}
