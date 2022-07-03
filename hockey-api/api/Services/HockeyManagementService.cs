using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using HockeyApi.Db;
using System.Threading;
using HockeyApi.Models;
using HockeyApi.Mappers;
using System.Collections.Generic;

namespace HockeyApi.Services
{
    public class HockeyManagementService : IHockeyManagementService
    {
        private readonly HockeyApiDbContext _context;

        public HockeyManagementService(HockeyApiDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Add player to team and return updated team.
        /// </summary>
        /// <param name="year"></param>
        /// <param name="playerPayload"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        public async Task<Player> AddPlayerToTeamByYearAsync(int year, PlayerPayload playerPayload, CancellationToken cancellationToken = default)
        {
            var selectedTeam = await GetTeamByYearAsync(year, cancellationToken);

            if (selectedTeam == null)
                return null;

            var newPlayer = playerPayload.ToPlayer();

            // Add player to team and unassign captain if the new player is captain
            if (playerPayload.IsCapitain == true)
                selectedTeam.Players = selectedTeam.Players.Select(p =>
                {
                    p.IsCapitain = false;
                    return p;
                }).Append(newPlayer).ToList();
            else
                selectedTeam.Players.Add(newPlayer);


            await _context.SaveChangesAsync(cancellationToken);

            return newPlayer;
        }

        /// <summary>
        /// Get Team by year and associated players if any.
        /// </summary>
        /// <param name="year"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        public async Task<Team> GetTeamByYearAsync(int year, CancellationToken cancellationToken = default)
        {
            return await _context.Teams.Include(team => team.Players).FirstOrDefaultAsync(x => x.Year == year, cancellationToken) ?? null;
        }

        /// <summary>
        /// Get all teams excpet associated players.
        /// </summary>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        public async Task<IEnumerable<Team>> GetTeamsAsync(CancellationToken cancellationToken = default)
        {
            return await _context.Teams.ToListAsync(cancellationToken);
        }


        /// <summary>
        /// Assign captain to player and return updated player.
        /// </summary>
        /// <param name="year"></param>
        /// <param name="playerId"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        public async Task<Player> UpdateTeamCaptainByYearAsync(int year, int playerId, CancellationToken cancellationToken = default)
        {
            var currentTeam = await GetTeamByYearAsync(year, cancellationToken);

            if (currentTeam == null)
                return null;

            var currentPlayer = currentTeam.Players.FirstOrDefault(p => p.Id == playerId);

            // Assign new captain to player and unassign previous captain
            currentTeam.Players = currentTeam.Players.Select(p =>
            {
                if (p.Id == playerId)
                    p.IsCapitain = true;
                else
                    p.IsCapitain = false;
                return p;
            }).ToList();

            await _context.SaveChangesAsync(cancellationToken);

            return currentTeam.Players.First(p => p.Id == playerId);
        }

        #region Technical operation
        /// <summary>
        /// Seed fake data to database.
        /// </summary>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        public async Task SeedFakeDatasAsync(CancellationToken cancellationToken = default)
        {
            foreach (var fakeTeam in FakerData.GetRandomTeams())
                await _context.Teams.AddAsync(fakeTeam, cancellationToken);

            await _context.SaveChangesAsync(cancellationToken);
        }

        #endregion

    }
}