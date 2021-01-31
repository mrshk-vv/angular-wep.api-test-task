using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using ConsoleTestTask.Common;
using ConsoleTestTask.Interfaces.Repositories;
using ConsoleTestTask.Interfaces.Services;
using ConsoleTestTask.Models;
using ConsoleTestTask.Repositories;

namespace ConsoleTestTask.Services
{
    class RssFeedService: IRssFeedService
    {
        private readonly IRssFeedRepository _feedRepository;
        private readonly IRssParserService _parserService;

        private Regex urlRegex = new Regex(@"^http(s)?://([\w-]+.)+[\w-]+(/[\w- ./?%&=])?$");

        public RssFeedService()
        {
            _parserService = new RssParserService();
            _feedRepository = new RssFeedsRepository();
        }

        public void GetAllFeeds()
        {
            var feeds = _feedRepository.GetAllFeeds();

            if (feeds.Count == 0)
            {
                Console.WriteLine("You have no channels");
                return;
            }

            List<Task> tasks = new List<Task>();

            tasks.Add(Task.Run(() => Console.SetCursorPosition(Console.CursorLeft, Console.CursorTop - 1)));

            foreach (var feed in feeds)
            {
                tasks.Add(Task.Run(() => _parserService.RssParser(feed)));
            }

            Task.WhenAll(tasks);

        }

        public void GetFeedByName()
        {
            Console.WriteLine();

            Console.WriteLine("Enter RSS Feed name");
            string feedName = Console.ReadLine();

            if (string.IsNullOrEmpty(feedName) || string.IsNullOrWhiteSpace(feedName))
            {
                GetAllFeeds();
            }
            else
            {
                var feed = _feedRepository.GetFeedByName(feedName);

                try
                {
                    if (feed is null)
                    {
                        throw new RssFeedException($"Feed with name {feedName} not exist");
                    }

                    Console.WriteLine($"Feed with name {feedName} downloading...");

                    _parserService.RssParser(feed);
                }
                catch (RssFeedException e)
                {
                    Console.WriteLine(e.Message);
                }
            }
        }

        public void AddNewFeed()
        {
            Console.WriteLine();

            RssFeed rssFeed = new RssFeed();

            bool incorrectFeedName = true;
            bool incorrectFeedUrl = true;

            Console.WriteLine("Enter RSS Feed name");
            while (incorrectFeedName)
            {
                rssFeed.Name = Console.ReadLine();
                if (!string.IsNullOrEmpty(rssFeed.Name) ||
                    !string.IsNullOrWhiteSpace(rssFeed.Name))
                {
                    incorrectFeedName = true;
                    break;
                }
                Console.WriteLine("Incorrect feed name, try again");
            }

            Console.WriteLine("Enter RSS Url name");
            while (incorrectFeedUrl)
            {
                rssFeed.Url = Console.ReadLine();
                if (urlRegex.IsMatch(rssFeed.Url))
                {
                    incorrectFeedUrl = true;
                    break;
                }
                Console.WriteLine("Incorrect feed URL");
            }

            _feedRepository.AddNewFeed(rssFeed);

            Console.WriteLine($"Feed {rssFeed} has been added");
        }

        public void RemoveFeed()
        {
            Console.WriteLine();

            Console.WriteLine("Enter RSS Feed name for remove");
            string feedName = Console.ReadLine();

            var feed = _feedRepository.GetFeedByName(feedName);

            try
            {
                if (feed is null)
                {
                    throw new RssFeedException($"Feed with name {feedName} not exist");
                }

                _feedRepository.RemoveFeed(feed);

                Console.WriteLine($"Feed with name {feedName} has been removed");
            }
            catch (RssFeedException e)
            {
                Console.WriteLine(e.Message);
            }

        }

        public void ShowFeedNames()
        {
            var feedNames = _feedRepository.GetAllFeeds().Select(x => x.Name).ToList();

            if (feedNames.Count == 0)
            {
                Console.WriteLine("You have no channels");
                return;
            }

            Console.WriteLine("Your feeds:");


            foreach (var feedName in feedNames)
            {
                Console.WriteLine("Feed: {0}", feedName);
            }
        }
    }
}
