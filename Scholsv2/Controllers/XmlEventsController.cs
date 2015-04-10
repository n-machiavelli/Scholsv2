using Schols.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Xml;
using System.Xml.Xsl;

namespace Scholsv2.Controllers
{
    public class XmlEventsController : ApiController
    {
        private string curl(string url)
        {
            var httpWebRequest = (HttpWebRequest)WebRequest.Create(url);
            //httpWebRequest.ContentType = "application/xml";
            httpWebRequest.Accept = "*/*";
            httpWebRequest.Method = "GET";
            //httpWebRequest.Headers.Add("Authorization", "Basic reallylongstring");
            var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
            using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
            {
                string respStr = streamReader.ReadToEnd();
                return respStr;
            }
        }
        [Route("api/getevents")]
        [HttpPost]
        public IHttpActionResult GetEvents()
        {
            string xsltString = curl("http://cdn.illinoisstate.edu/xsl/cal_feed.xsl");
            string inputXml = curl("http://feeds.illinoisstate.edu/events/academic_calendar.rss");

            //the limit set in xslt file above is 5. i'm using fixed sidebar and 5 items doesnt look good because i disabled scrolling. changing to 3 using the ffg to add param
            //also noticed in home.php it's using 3 array('limit'=>'3','image-size'=>'140','template'=>'thumb','link-desc-sep'=>'','length'=>300,'more-text'=>'')
            XsltArgumentList argsList = new XsltArgumentList();
            argsList.AddParam("limit", "",3);

            XslCompiledTransform transform = new XslCompiledTransform();
            using (XmlReader reader = XmlReader.Create(new StringReader(xsltString)))
            {
                transform.Load(reader);
            }
            StringWriter results = new StringWriter();
            using (XmlReader reader = XmlReader.Create(new StringReader(inputXml)))
            {
                transform.Transform(reader, argsList, results);
            }
            System.Diagnostics.Debug.WriteLine(results.ToString());
            return Ok(results.ToString());
        }
        [Route("api/getnews")]
        [HttpPost]
        public IHttpActionResult GetNews()
        {
            string xsltString = curl("http://cdn.illinoisstate.edu/xsl/news_feed.xsl");
            string inputXml = curl("http://feeds.illinoisstate.edu/news/news.rss");

            //the limit set in xslt file above is 5. i'm using fixed sidebar and 5 items doesnt look good because i disabled scrolling. changing to 3 using the ffg to add param
            //also noticed in home.php it's using 3 array('limit'=>'3','image-size'=>'140','template'=>'thumb','link-desc-sep'=>'','length'=>300,'more-text'=>'')
            XsltArgumentList argsList = new XsltArgumentList();
            argsList.AddParam("limit", "", 3);

            XslCompiledTransform transform = new XslCompiledTransform();
            using (XmlReader reader = XmlReader.Create(new StringReader(xsltString)))
            {
                transform.Load(reader);
            }
            StringWriter results = new StringWriter();
            using (XmlReader reader = XmlReader.Create(new StringReader(inputXml)))
            {
                transform.Transform(reader, argsList, results);
            }
            System.Diagnostics.Debug.WriteLine(results.ToString());
            return Ok(results.ToString());
        }
    }
}
