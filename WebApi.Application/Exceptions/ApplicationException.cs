using System;

namespace Application.Exceptions
{
    public class ApplicationException: Exception
    {
        public override string Message { get; }

        public ApplicationException(string message)
        {
            Message = message;
        }
    }
}
