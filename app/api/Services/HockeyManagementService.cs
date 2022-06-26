using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using HockeyApi.Db;
using System.Threading;
using HockeyApi.Models;
using HockeyApi.Mappers;
using System.Collections.Generic;

namespace HockeyApi.Service
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

            // Add player to team and unassign captain if the new player is captain
            if (playerPayload.IsCapitain == true)
                selectedTeam.Players = selectedTeam.Players.Select(p =>
                {
                    p.IsCapitain = false;
                    return p;
                }).Append(playerPayload.ToPlayer()).ToList();
            else
                selectedTeam.Players.Add(playerPayload.ToPlayer());


            await _context.SaveChangesAsync(cancellationToken);
            return selectedTeam.Players.Last();
        }

        /// <summary>
        /// Get Team by year and associated players if any.
        /// </summary>
        /// <param name="year"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        public async Task<Team> GetTeamByYearAsync(int year, CancellationToken cancellationToken = default)
        {
            var selectedTeam = await _context.Teams.Include(team => team.Players).FirstOrDefaultAsync(x => x.Year == year, cancellationToken);
            if (selectedTeam == null)
                return null;

            return selectedTeam;
        }

        /// <summary>
        /// Get all teams excpet associated players.
        /// </summary>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        public async Task<IEnumerable<Team>> GetTeamsAsync(CancellationToken cancellationToken)
        {
            var teams = await _context.Teams.ToListAsync(cancellationToken);

            return teams;
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
            var team = await GetTeamByYearAsync(year, cancellationToken);

            if (team == null)
                return null;

            team.Players = team.Players.Select(p =>
            {
                if (p.Id == playerId)
                    p.IsCapitain = true;
                else
                    p.IsCapitain = false;
                return p;
            }).ToList();

            await _context.SaveChangesAsync(cancellationToken);

            return team.Players.First(p => p.Id == playerId);
        }

        // public Task<Team> CreateTeamByYearAsync(int teamId, int year, Team teamPayload, CancellationToken cancellationToken = default)
        // {
        //         var result = await _context.Teams.AddAsync(teamPayload, cancellationToken);
        //         await _context.SaveChangesAsync(cancellationToken);

        //         return new Team()
        //         {
        //             Id = result.Entity.Id,
        //             Coach = result.Entity.Coach,
        //             Year = result.Entity.Year,
        //         };
        // }

        // public async Task<Team> CreateTeamAsync(Team teamPayload, CancellationToken cancellationToken)
        // {
        //     var result = await _context.Teams.AddAsync(teamPayload, cancellationToken);
        //     await _context.SaveChangesAsync(cancellationToken);

        //     return new Team()
        //     {
        //         Id = result.Entity.Id,
        //         Coach = result.Entity.Coach,
        //         Year = result.Entity.Year,
        //     };
        // }

        // public async Task<Team> UpdateTeamAsync(int year, Team teamPayload, CancellationToken cancellationToken)
        // {
        //     var entity = await _context.Teams.FirstAsync(t => t.Year == year, cancellationToken);

        //     if (entity != null)
        //     {
        //         entity.Coach = teamPayload.Coach;

        //         await _context.SaveChangesAsync(cancellationToken);
        //         return await GetTeamAsync(year, cancellationToken);
        //     }
        //     return null;
        // }

        // public async Task DeleteTeamAsync(int year, CancellationToken cancellationToken)
        // {
        //     var entity = await _context.Teams.FirstAsync(t => t.Year == year, cancellationToken);

        //     if (entity != null)
        //     {
        //         _context.Remove(entity);

        //         await _context.SaveChangesAsync(cancellationToken);
        //     }
        // }

        // public async Task<Team> GetTeamAsync(int year, CancellationToken cancellationToken)
        // {
        //     var team = await _context.Teams.FirstAsync(t => t.Year == year, cancellationToken);

        //     if (team == null)
        //         return null;

        //     return new Team()
        //     {
        //         Id = team.Id,
        //         Coach = team.Coach,
        //         Year = team.Year,
        //         Players = team.Players
        //     };
        // }

        // public async Task<Team> GetTeamByYearAsync(int teamId, int year, CancellationToken cancellationToken)
        // {
        //     var team = await _context.Teams.FirstAsync(t => t.Id == teamId && t.Year == year, cancellationToken);

        //     if (team == null)
        //         return null;

        //     return new Team()
        //     {
        //         Id = team.Id,
        //         Coach = team.Coach,
        //         Year = team.Year,
        //     };
        // }
    }
}