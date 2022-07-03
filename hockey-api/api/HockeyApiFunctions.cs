using System.IO;
using System.Threading.Tasks;
using System.Net;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Extensions.OpenApi.Core.Attributes;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Microsoft.OpenApi.Models;
using HockeyApi.Models;
using HockeyApi.Services;
using System.Web.Http;
using System.Collections.Generic;

namespace HockeyApi.Functions
{
    public class HockeyApiFunctions
    {
        private readonly IHockeyManagementService _hockeyManagementService;

        public HockeyApiFunctions(IHockeyManagementService hockeyManagementService)
        {
            _hockeyManagementService = hockeyManagementService;
        }

        [FunctionName("GetTeams")]
        [OpenApiOperation(
            operationId: "GetTeams",
            tags: new[] { "Team" },
            Summary = "Get every teams existing",
            Description = "Get every teams existing")]
        [OpenApiResponseWithBody(HttpStatusCode.OK, "application/json", typeof(IEnumerable<Team>))]
        [OpenApiResponseWithoutBody(HttpStatusCode.NotFound, Description = "No teams found")]
        public async Task<IActionResult> GetTeams(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "teams")] HttpRequest req, ILogger log)
        {
            var result = await _hockeyManagementService.GetTeamsAsync();
            if (result == null)
                return new NotFoundObjectResult("No teams found");

            return new OkObjectResult(result);
        }

        [FunctionName("GetTeamByYear")]
        [OpenApiOperation(
            operationId: "GetTeamByYear",
            tags: new[] { "Team" },
            Summary = "Get team data by year",
            Description = "Get the composition of the team according to specific year.")]
        [OpenApiParameter("year", In = ParameterLocation.Path, Required = true, Description = "Year", Type = typeof(int))]
        [OpenApiResponseWithBody(HttpStatusCode.OK, "application/json", typeof(Team))]
        [OpenApiResponseWithBody(HttpStatusCode.BadRequest, "application/text", typeof(string), Description = "Invalid datas")]
        [OpenApiResponseWithoutBody(HttpStatusCode.NotFound, Description = "Team not found")]

        public async Task<IActionResult> GetTeamByYear(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "teams/{year}")] HttpRequest req,
            string year,
            ILogger log)
        {
            var yearPayload = int.TryParse(year, out var yearInt) ? yearInt : (int?)null;
            if (yearPayload == null)
                return new BadRequestObjectResult("Invalid year");

            var result = await _hockeyManagementService.GetTeamByYearAsync(yearPayload.Value);
            if (result == null)
                return new NotFoundObjectResult("Team not found");

            return new OkObjectResult(result);
        }

        [FunctionName("AddUserToTeamByYear")]
        [OpenApiOperation(
            operationId: "AddUserToTeamByYear",
            tags: new[] { "Team" },
            Summary = "Add user to team by year",
            Description = "Add user to team according to specific year.")]
        [OpenApiParameter("year", In = ParameterLocation.Path, Required = true, Description = "Year", Type = typeof(int))]
        [OpenApiRequestBody(contentType: "application/json", bodyType: typeof(PlayerPayload), Description = "Player payload", Required = true)]
        [OpenApiResponseWithBody(HttpStatusCode.Created, "application/json", typeof(Player))]
        [OpenApiResponseWithBody(HttpStatusCode.InternalServerError, "application/text", typeof(string), Description = "Player cannot be created")]
        public async Task<IActionResult> CreateTeam(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "teams/{year}")] HttpRequest req,
            string year, ILogger log)
        {
            try
            {
                var yearPayload = int.TryParse(year, out var yearInt) ? yearInt : (int?)null;
                if (yearPayload == null)
                    return new BadRequestObjectResult("Invalid year");

                var requestBody = await new StreamReader(req.Body).ReadToEndAsync();

                var newPlayer = JsonConvert.DeserializeObject<PlayerPayload>(requestBody);

                var result = await _hockeyManagementService.AddPlayerToTeamByYearAsync(
                    yearPayload.Value,
                    newPlayer);

                if (result == null)
                    return new InternalServerErrorResult();

                return new OkObjectResult(result);
            }
            catch (System.Exception exception)
            {
                log.LogError(exception, "CreatePlayer");
                return new InternalServerErrorResult();
            }
        }

        [FunctionName("UpdateTeamCaptainByYear")]
        [OpenApiOperation(
        operationId: "UpdateTeamCaptainByYear",
        tags: new[] { "Team" },
        Summary = "Update team captain by year",
        Description = "Update team captain according to specific year.")]
        [OpenApiParameter("year", In = ParameterLocation.Path, Required = true, Description = "Year", Type = typeof(int))]
        [OpenApiParameter("playerId", In = ParameterLocation.Path, Required = true, Description = "PlayerId", Type = typeof(int))]
        [OpenApiResponseWithBody(HttpStatusCode.BadRequest, "application/text", typeof(string), Description = "Invalid year")]
        [OpenApiResponseWithBody(HttpStatusCode.OK, "application/json", typeof(Player))]
        [OpenApiResponseWithBody(HttpStatusCode.InternalServerError, "application/text", typeof(string), Description = "Team cannot be updated")]
        public async Task<IActionResult> UpdateTeamCaptainByYear(
            [HttpTrigger(AuthorizationLevel.Anonymous, "put", Route = "teams/{year}/{playerId}/captain")] HttpRequest req, string year, string playerId, ILogger log)
        {
            var yearPayload = int.TryParse(year, out var yearInt) ? yearInt : (int?)null;
            if (yearPayload == null)
                return new BadRequestObjectResult("Invalid year");

            var playerIdPayload = int.TryParse(playerId, out var playerIdInt) ? playerIdInt : (int?)null;
            if (playerIdPayload == null)
                return new BadRequestObjectResult("Player Id");

            var result = await _hockeyManagementService.UpdateTeamCaptainByYearAsync(
                yearPayload.Value,
                playerIdPayload.Value);

            if (result == null)
                return new InternalServerErrorResult();

            return new OkObjectResult(result);
        }

        [FunctionName("SeedDatas")]
        [OpenApiOperation(
            operationId: "GetTeams",
            tags: new[] { "Technical" },
            Summary = "Seed database",
            Description = "Seed database with fake datas.")]
        [OpenApiResponseWithBody(HttpStatusCode.Created, "application/json", typeof(string), Description = "Database seeded")]
        [OpenApiResponseWithoutBody(HttpStatusCode.NotFound, Description = "Database cannot be seeded")]
        public async Task<IActionResult> SeedFakeDatas(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "seed")] HttpRequest req, ILogger log)
        {
            try
            {
                await _hockeyManagementService.SeedFakeDatasAsync();
                return new OkObjectResult("Database seeded");
            }
            catch (System.Exception exception)
            {
                log.LogError(exception, "SeedDatas");
                return new NotFoundObjectResult("Database cannot be seeded");
            }
        }


    }
}
