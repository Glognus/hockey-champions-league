using Xunit;
using HockeyApi.Models;
using System.Threading.Tasks;
using System.Collections.Generic;
using FluentAssertions;

namespace HockeyApi.Tests;

public class HockeyManagementTests : ServiceBaseTests
{
    [Fact]
    public async Task GetTeamsAsync_Returns_List_Of_Teams()
    {
        var result = await _hockeyApiMock.Object.GetTeamsAsync();
        result.Should().BeEquivalentTo(new List<Team> { _teamData });
    }

    [Fact]
    public async Task GetTeamByYearAsync_Returns_Team()
    {
        var result = await _hockeyApiMock.Object.GetTeamByYearAsync(2018);
        result.Should().BeEquivalentTo(_teamData);
    }

    [Fact]
    public async Task AddPlayerToTeamByYearAsync_Returns_Player()
    {
        var result = await _hockeyApiMock.Object.AddPlayerToTeamByYearAsync(2018, new PlayerPayload
        {
            Number = 3,
            Name = "Lola",
            Lastname = "Alfred",
            Position = "LEFT_WINGER",
            IsCapitain = false
        });

        result.Should().BeEquivalentTo(new Player
        {
            Id = 3,
            Number = 3,
            Name = "Lola",
            Lastname = "Alfred",
            Position = "LEFT_WINGER",
            IsCapitain = false
        });
    }

    [Fact]
    public async Task UpdateTeamCaptainByYearAsync_Returns_Player()
    {
        var result = await _hockeyApiMock.Object.UpdateTeamCaptainByYearAsync(2018, 2);
        result.Should().BeEquivalentTo(new Player
        {
            Id = 2,
            Number = 2,
            Name = "John",
            Lastname = "Doe",
            Position = "LEFT_WINGER",
            IsCapitain = true
        });
    }
}
