using ConsoleTestTask.Models;

namespace ConsoleTestTask.Interfaces.Services
{
    interface IRssParserService
    {
        void RssParser(RssFeed rssFeed);
    }
}
