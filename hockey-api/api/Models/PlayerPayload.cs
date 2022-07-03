namespace HockeyApi.Models
{
    public class PlayerPayload
    {
        public int? Number { get; set; }
        public string Name { get; set; }
        public string Lastname { get; set; }
        public string Position { get; set; }
        public bool? IsCapitain { get; set; }
    }
}
