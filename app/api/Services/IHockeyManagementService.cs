using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using HockeyApi.Models;

namespace HockeyApi.Service
{
    public interface IHockeyManagementService
    {
        Task<IEnumerable<Team>> GetTeamsAsync(CancellationToken cancellationToken = default);
        // Task<Team> GetTeamAsync(int teamId, CancellationToken cancellationToken = default);
        Task<Team> GetTeamByYearAsync(int year, CancellationToken cancellationToken = default);
        // Task<Team> CreateTeamAsync(int teamId, Team teamPayload, CancellationToken cancellationToken = default);
        Task<Player> AddPlayerToTeamByYearAsync(int year, PlayerPayload playerPayload, CancellationToken cancellationToken = default);
        // Task<Team> UpdateTeamAsync(int year, Team teamPayload, CancellationToken cancellationToken = default);
        Task<Player> UpdateTeamCaptainByYearAsync(int year, int playerId, CancellationToken cancellationToken = default);
        // Task DeleteTeamAsync(int year, CancellationToken cancellationToken = default);

        // Task<IEnumerable<Team>> GetPlayersAsync(int year, CancellationToken cancellationToken = default);
        // Task<Team> GetPlayerAsync(int id, CancellationToken cancellationToken = default);
        // Task<Team> CreatePlayerAsync(int year, Player playerPayload, CancellationToken cancellationToken = default);
        // Task<Team> UpdatePlayerAsync(Player playerPayload, CancellationToken cancellationToken = default);
        // Task DeletePlayerAsync(int year, CancellationToken cancellationToken = default);

        // Task<Team> GetTeamAsync(int year, CancellationToken cancellationToken = default);
        // Task<Team> CreateTeamAsync(Team teamPayload, CancellationToken cancellationToken = default);
        // Task<Team> UpdateCaptainAsync(id, CancellationToken cancellationToken = default);
    }
}

// teams/{year}/players/{id}
// players/{id}