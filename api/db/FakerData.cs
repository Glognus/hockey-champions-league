using System.Collections.Generic;
using HockeyApi.Models;

namespace HockeyApi.Db
{
    public static class FakerData
    {
        private static string[] Positions = new string[] {
            "CENTER_DEFENSEMAN",
            "GOALTENDER",
            "LEFT_DEFENSEMAN",
            "RIGHT_DEFENSEMAN",
            "LEFT_WINGER",
            "RIGHT_WINGER"
         };

        /// <summary>
        /// Generate a list of players.
        /// </summary>
        /// <returns></returns>
        public static List<Player> GetRandomPlayers()
        {
            var players = new List<Player>();
            for (int i = 0; i < 5; i++)
            {
                players.Add(new Player
                {
                    Name = Faker.Name.First(),
                    Lastname = Faker.Name.Last(),
                    Number = Faker.RandomNumber.Next(1, 99),
                    Position = Positions[i],
                    IsCapitain = i == 0,
                });
            }
            return players;
        }

        /// <summary>
        /// Generate random teams.
        /// </summary>
        /// <returns></returns>
        public static List<Team> GetRandomTeams()
        {
            var teams = new List<Team>();
            for (int i = 1900; i < 2022; i++)
            {
                teams.Add(new Team
                {
                    Coach = Faker.Name.FullName(),
                    Year = i,
                    Players = GetRandomPlayers()
                });
            }
            return teams;
        }
    }
}