using System;
using System.Threading.Tasks;
using ConsoleTestTask.Common;
using ConsoleTestTask.Interfaces.Repositories;
using ConsoleTestTask.Interfaces.Services;
using ConsoleTestTask.Repositories;
using ConsoleTestTask.Services;

namespace ConsoleTestTask
{
    public class Startup
    {
        //private const string ADD = "Add";
        //private const string REMOVE = "Remove";
        //private const string VIEW = "View";
        //private const string SHOW = "Show";
        //private const string CLEAR = "Clear";

        private IRssFeedService _rssFeedService;

        public Startup()
        {
            _rssFeedService = new RssFeedService();
            StartProgram();
        }

        public void StartProgram()
        {

            string checker = "y";

            Console.WriteLine("Hello,dear User, let get start use program");
            ShowCommands();

            Commands command = Commands.None;

            while (checker == "y")
            {
                Console.WriteLine("Enter command:");
                try
                {
                    command = Enum.Parse<Commands>(Console.ReadLine());
                }
                catch
                {
                    command = Commands.None;
                }


                switch (command)
                {
                    case Commands.View:
                        _rssFeedService.GetFeedByName();
                        break;
                    case Commands.Remove:
                        _rssFeedService.RemoveFeed();
                        break;
                    case Commands.Add:
                        _rssFeedService.AddNewFeed();
                        break;
                    case Commands.Show:
                        _rssFeedService.ShowFeedNames();
                        break;
                    case Commands.Clear:
                        Console.Clear();
                        ShowCommands();
                        break;
                    default:
                        Console.WriteLine("This command undefined");
                        Console.WriteLine("Are you want exit from program ?\n" +
                                          "If 'yes' then enter any character, if not then 'y'");
                        checker = Console.ReadLine();
                        break;
                }

            }
        }

        private void ShowCommands()
        {
            Console.WriteLine("Commands:\n" +
                              "Add - Add new RSS Feed\n" +
                              "Remove - Remove RSS Feed from list\n" +
                              "View - View RSS Feed news\n" +
                              "Show - This command show your feed names\n" +
                              "Сlear - This command clear console\n" +
                              "If you do not enter the name of the channel, then all news from all channels will be downloaded, so be careful\n");
        }
    }
}
