using System.Collections.Generic;
using System.Runtime.Serialization;

namespace HockeyApi.Models
{
    public partial class Player
    {
        public Player()
        {
            Teams = new HashSet<Team>();
        }
        public int Id { get; set; }
        public int? Number { get; set; }
        public string Name { get; set; }
        public string Lastname { get; set; }
        public string Position { get; set; }
        public bool? IsCapitain { get; set; }

        [IgnoreDataMember]
        public ICollection<Team> Teams { get; set; }
    }
}
