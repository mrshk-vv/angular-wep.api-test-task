namespace ConsoleTestTask.Interfaces.Services
{
    interface IRssFeedService
    {
        void GetAllFeeds();

        void GetFeedByName();

        void AddNewFeed();

        void RemoveFeed();

        void ShowFeedNames();

    } 
}
