namespace Scholsv2.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class MoreProfileColumns : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.AspNetUsers", "UserMajor", c => c.String());
            AddColumn("dbo.AspNetUsers", "FirstName", c => c.String());
            AddColumn("dbo.AspNetUsers", "MiddleName", c => c.String());
            AddColumn("dbo.AspNetUsers", "LastName", c => c.String());
            AddColumn("dbo.AspNetUsers", "UniversityId", c => c.String());
            DropColumn("dbo.AspNetUsers", "Major");
        }
        
        public override void Down()
        {
            AddColumn("dbo.AspNetUsers", "Major", c => c.String());
            DropColumn("dbo.AspNetUsers", "UniversityId");
            DropColumn("dbo.AspNetUsers", "LastName");
            DropColumn("dbo.AspNetUsers", "MiddleName");
            DropColumn("dbo.AspNetUsers", "FirstName");
            DropColumn("dbo.AspNetUsers", "UserMajor");
        }
    }
}
