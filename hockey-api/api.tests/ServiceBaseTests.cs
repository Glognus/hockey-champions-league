using Moq;
using HockeyApi.Services;
using HockeyApi.Models;
using System.Collections.Generic;
using System.Threading;

namespace HockeyApi.Tests;

public abstract class ServiceBaseTests
{
    protected readonly Mock<IHockeyManagementService> _hockeyApiMock;

    public readonly Team _teamData;

    public ServiceBaseTests()
    {
        _teamData = new Team
        {
            Id = 1,
            Coach = "Maplr",
            Year = 2018,
            Players = new List<Player>
            {
                new Player
                {
                    Id = 1,
                    Number = 1,
                    Name = "Thomas",
                    Lastname = "Sebbane",
                    Position = "CENTER_DEFENSEMAN",
                    IsCapitain = true
                },
                new Player
                {
                    Id = 2,
                    Number = 2,
                    Name = "John",
                    Lastname = "Doe",
                    Position = "LEFT_WINGER",
                    IsCapitain = false
                }
            }
        };

        _hockeyApiMock = new Mock<IHockeyManagementService>();
        _hockeyApiMock.Setup(service => service.GetTeamsAsync(It.IsAny<CancellationToken>()))
            .ReturnsAsync(new List<Team> { _teamData });

        _hockeyApiMock.Setup(service => service.GetTeamByYearAsync(It.IsAny<int>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(_teamData);

        _hockeyApiMock.Setup(service => service.AddPlayerToTeamByYearAsync(It.IsAny<int>(), It.IsAny<PlayerPayload>(), It.IsAny<CancellationToken>())).ReturnsAsync(
            new Player
            {
                Id = 3,
                Number = 3,
                Name = "Lola",
                Lastname = "Alfred",
                Position = "LEFT_WINGER",
                IsCapitain = false
            });

        _hockeyApiMock.Setup(service => service.UpdateTeamCaptainByYearAsync(It.IsAny<int>(), It.IsAny<int>(), It.IsAny<CancellationToken>())).ReturnsAsync(
            new Player
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
