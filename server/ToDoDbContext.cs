using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Scaffolding.Internal;

namespace TodoList;

public partial class ToDoDbContext : DbContext
{
    public ToDoDbContext()
    {
    }

    public ToDoDbContext(DbContextOptions<ToDoDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Item> Items { get; set; }

    public virtual DbSet<Session> Sessions { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseMySql("name=ToDoDB", Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.40-mysql"));

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb4_0900_ai_ci")
            .HasCharSet("utf8mb4");

        modelBuilder.Entity<Item>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("items");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.TaskName)
                .HasMaxLength(100)
                .HasColumnName("taskName");
        });

        // modelBuilder.Entity<Session>(entity =>
        // {
        //     entity
        //         .HasNoKey()
        //         .ToTable("sessions");

        //     entity.HasIndex(e => e.UserId, "user_id");

        //     entity.Property(e => e.Date)
        //         .HasDefaultValueSql("CURRENT_TIMESTAMP")
        //         .HasColumnType("timestamp")
        //         .HasColumnName("date");
        //     entity.Property(e => e.UserId).HasColumnName("user_id");

        //     entity.HasOne(d => d.User).WithMany()
        //         .HasForeignKey(d => d.UserId)
        //         .OnDelete(DeleteBehavior.ClientSetNull)
        //         .HasConstraintName("sessions_ibfk_1");
        // });
modelBuilder.Entity<Session>(entity =>
{
    // הגדרת המפתח הראשי
    entity.HasKey(e => e.Number).HasName("PRIMARY");  // זהו השדה החדש 'number' שמוגדר כמפתח ראשי

    entity.ToTable("Sessions");

    // הגדרת האינדקס על השדה UserId
    entity.HasIndex(e => e.UserId, "user_id");

    // הגדרת שדה ה-Date
    entity.Property(e => e.Date)
        .HasDefaultValueSql("CURRENT_TIMESTAMP")
        .HasColumnType("timestamp")
        .HasColumnName("date");

    // הגדרת שדה ה-UserId
    entity.Property(e => e.UserId)
        .HasColumnName("user_id");

    // הגדרת הקשר עם הטבלה Users
    entity.HasOne(d => d.User)
        .WithMany()
        .HasForeignKey(d => d.UserId)
        .OnDelete(DeleteBehavior.ClientSetNull)
        .HasConstraintName("sessions_ibfk_1");
});
        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("Users");

            entity.HasIndex(e => e.Password, "password").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Password).HasColumnName("password");
            entity.Property(e => e.Username)
                .HasMaxLength(255)
                .HasColumnName("username");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
