using System;
using System.Net.Http;
using ConsoleTestTask.Interfaces.Services;
using ConsoleTestTask.Models;
using Microsoft.Toolkit.Parsers.Rss;

namespace ConsoleTestTask.Services
{
    class RssParserService : IRssParserService, IDisposable
    {
        public void RssParser(RssFeed rssFeed)
        {
            string feed = null;

            using (var client = new HttpClient())
            {
                try
                {
                    feed = client.GetStringAsync(rssFeed.Url).Result;
                }
                catch (Exception e)
                {
                    Console.WriteLine(e.Message);
                }
            }

            if (feed != null)
            {
                var parser = new RssParser();
                var rss = parser.Parse(feed);

                if (rss is null)
                {
                    Console.WriteLine("Feed is empty");
                    return;
                }

                Console.WriteLine($"------------------{rssFeed.Name}------------------");

                foreach (var element in rss)
                {
                    Console.WriteLine($"Title: {element.Title}");
                }

                Console.WriteLine();
            }
        }

        void IDisposable.Dispose()
        {
            GC.SuppressFinalize(this);
        }

    }
}
