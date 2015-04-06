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

            XslCompiledTransform transform = new XslCompiledTransform();
            using (XmlReader reader = XmlReader.Create(new StringReader(xsltString)))
            {
                transform.Load(reader);
            }
            StringWriter results = new StringWriter();
            using (XmlReader reader = XmlReader.Create(new StringReader(inputXml)))
            {
                transform.Transform(reader, null, results);
            }
            return Ok(results.ToString());

        }

    }
}
