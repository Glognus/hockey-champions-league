using System.Collections.Generic;

namespace HockeyApi.Models
{
    public partial class Team
    {
        public Team()
        {
            Players = new HashSet<Player>();
        }
        public int Id { get; set; }
        public string Coach { get; set; }
        public int Year { get; set; }

        public ICollection<Player> Players { get; set; }
    }
}
