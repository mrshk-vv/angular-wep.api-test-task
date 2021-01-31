using System;

namespace ConsoleTestTask.Models
{
    public class RssFeed
    {
        /// <summary>
        /// Id of Feed
        /// </summary>
        public Guid Id { get; set; }

        /// <summary>
        /// Feed's name
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Feed's url
        /// </summary>
        public string Url { get; set; }

        /// <summary>
        /// Constructor
        /// </summary>
        public RssFeed()
        {
            Id = Guid.NewGuid();
        }

        public override string ToString()
        {
            return $"{Name} {Url}";
        }
    }
}
