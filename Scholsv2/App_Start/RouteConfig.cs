using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace Scholsv2
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "Ng",
                url: "ng/{*.}",
                defaults: new { controller = "Home", action = "Ng" }
            );
            routes.MapRoute(
                name: "Angular",
                url: "angular/{*.}",
                defaults: new { controller = "Home", action = "Index" }
            );
            //routes.MapRoute(
            //    name: "DefaultHere",
            //    url: "{*}",
            //    defaults: new { controller = "Home", action = "Index" }
            //);
        }
    }
}
