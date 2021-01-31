using System.Collections.Generic;
using ConsoleTestTask.Models;

namespace ConsoleTestTask.Interfaces.Repositories
{
    interface IRssFeedRepository
    {
        List<RssFeed> GetAllFeeds();

        RssFeed GetFeedByName(string name);

        void AddNewFeed(RssFeed feed);

        void RemoveFeed(RssFeed feed);
    }
}
