using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using ConsoleTestTask.Common;
using ConsoleTestTask.Interfaces.Repositories;
using ConsoleTestTask.Models;

namespace ConsoleTestTask.Repositories
{
    /// <summary>
    /// Fake RSS repository
    /// </summary>
    public class RssFeedsRepository: IRssFeedRepository
    {
        /// <summary>
        /// Mock collection
        /// </summary>
        public static List<RssFeed> RssFeeds = new List<RssFeed>();

        /// <summary>
        /// Get All Feeds
        /// </summary>
        public List<RssFeed> GetAllFeeds()
        {
            return RssFeedsRepository.RssFeeds;
        }

        /// <summary>
        /// Get RSS Feed by name
        /// </summary>
        /// <param name="name"></param>
        /// <returns>RssFeed</returns>
        public RssFeed GetFeedByName(string name)
        {
            return RssFeeds.SingleOrDefault(f => f.Name == name);
        }

        /// <summary>
        /// Add new RSS Feed
        /// </summary>
        /// <param name="feed"></param>
        public void AddNewFeed(RssFeed feed)
        {
            RssFeedsRepository.RssFeeds.Add(feed);
        }

        /// <summary>
        /// Remove RSS Feed
        /// </summary>
        /// <param name="feed"></param>
        public void RemoveFeed(RssFeed feed)
        {
            RssFeedsRepository.RssFeeds.Remove(feed);
        }
    }
}
