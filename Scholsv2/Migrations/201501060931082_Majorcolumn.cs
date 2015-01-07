namespace Scholsv2.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Majorcolumn : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.AspNetUsers", "major", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.AspNetUsers", "major");
        }
    }
}
