using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using HockeyApi.Models;

namespace HockeyApi.Services
{
    public interface IHockeyManagementService
    {
        Task<IEnumerable<Team>> GetTeamsAsync(CancellationToken cancellationToken = default);
        Task<Team> GetTeamByYearAsync(int year, CancellationToken cancellationToken = default);
        Task<Player> AddPlayerToTeamByYearAsync(int year, PlayerPayload playerPayload, CancellationToken cancellationToken = default);
        Task<Player> UpdateTeamCaptainByYearAsync(int year, int playerId, CancellationToken cancellationToken = default);
        Task SeedFakeDatasAsync(CancellationToken cancellationToken = default);
    }
}
