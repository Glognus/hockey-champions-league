using Microsoft.EntityFrameworkCore;
using HockeyApi.Models;
using System.Collections.Generic;

namespace HockeyApi.Db
{
    public partial class HockeyApiDbContext : DbContext
    {
        public HockeyApiDbContext()
        {
        }

        public HockeyApiDbContext(DbContextOptions<HockeyApiDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Player> Players { get; set; }
        public virtual DbSet<Team> Teams { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Player>(entity =>
            {
                entity.ToTable("players");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.IsCapitain)
                    .HasColumnName("is_capitain")
                    .HasDefaultValueSql("false");

                entity.Property(e => e.Lastname).HasColumnName("lastname");

                entity.Property(e => e.Name).HasColumnName("name");

                entity.Property(e => e.Number).HasColumnName("number");

                entity.Property(e => e.Position).HasColumnName("position");
            });

            modelBuilder.Entity<Team>(entity =>
            {
                entity.ToTable("teams");

                entity.HasIndex(e => e.Year, "teams_year_key")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Coach)
                    .IsRequired()
                    .HasColumnName("coach");

                entity.Property(e => e.Year).HasColumnName("year");

                entity.HasMany(p => p.Players)
                    .WithMany(p => p.Teams)
                    .UsingEntity<Dictionary<string, object>>(
                        "TeamPlayer",
                        j => j
                            .HasOne<Player>()
                            .WithMany()
                            .HasForeignKey("player_id")
                            .HasConstraintName("FK_TeamPlayer_Players_PlayerId")
                            .OnDelete(DeleteBehavior.Cascade),
                        j => j
                            .HasOne<Team>()
                            .WithMany()
                            .HasForeignKey("team_id")
                            .HasConstraintName("FK_TeamPlayer_Teams_TeamId")
                            .OnDelete(DeleteBehavior.ClientCascade))
                        .ToTable("player_team");

            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}