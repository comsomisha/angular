using System;

namespace Services.Models
{
    public class Student
    {
        public long ID { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public DateTime? Birthday { get; set; }
        public int? SexID { get; set; }
        public int? Course { get; set; }
        public int? Group { get; set; }
    }
}