using System;

namespace ConsoleTestTask.Common
{
    class RssFeedException: Exception
    {
        public override string Message { get; }

        public RssFeedException(string message)
        {
            Message = message;
        }
    }
}
