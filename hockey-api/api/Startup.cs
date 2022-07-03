

using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using HockeyApi.Services;
using HockeyApi.Db;

[assembly: FunctionsStartup(typeof(HockeyApi.Startup))]
namespace HockeyApi
{
    class Startup : FunctionsStartup
    {
        public override void Configure(IFunctionsHostBuilder builder)
        {
            var connectionString = Environment.GetEnvironmentVariable("PostgreSQLConnectionString");
            builder.Services.AddEntityFrameworkNpgsql().AddDbContext<HockeyApiDbContext>(
                options => options.UseNpgsql(connectionString));
            builder.Services.AddTransient<IHockeyManagementService, HockeyManagementService>();
        }
    }
}