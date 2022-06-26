using HockeyApi.Models;

namespace HockeyApi.Mappers
{
    public static class PlayerMapper
    {
        /// <summary>
        /// Transform PlayerPayload to Player.
        /// </summary>
        /// <param name="player"></param>
        /// <returns></returns>
        public static Player ToPlayer(this PlayerPayload player)
        {
            return new Player
            {
                Number = player.Number,
                Name = player.Name,
                Lastname = player.Lastname,
                Position = player.Position,
                IsCapitain = player.IsCapitain
            };
        }
    }
}