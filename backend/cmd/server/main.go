package main

import (
	"log"

	"ptype-backend/internal/config"
	"ptype-backend/internal/handler"
	"ptype-backend/internal/repository"
	"ptype-backend/internal/router"
	"ptype-backend/internal/service"
	"ptype-backend/pkg/database"
	"ptype-backend/pkg/jwt"
)

func main() {
	// Load config
	cfg := config.Load()

	// Connect to database
	db, err := database.NewMySQL(&cfg.Database)
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}

	// Auto migrate
	if err := database.AutoMigrate(db); err != nil {
		log.Fatalf("Failed to migrate database: %v", err)
	}

	// Initialize JWT manager
	jwtManager := jwt.NewJWTManager(cfg.JWT.Secret, cfg.JWT.ExpireHour)

	// Initialize repositories
	userRepo := repository.NewUserRepository(db)
	recordRepo := repository.NewRecordRepository(db)

	// Initialize services
	authService := service.NewAuthService(userRepo, jwtManager)
	recordService := service.NewRecordService(recordRepo)

	// Initialize handlers
	authHandler := handler.NewAuthHandler(authService)
	recordHandler := handler.NewRecordHandler(recordService)
	leaderboardHandler := handler.NewLeaderboardHandler(recordService)

	// Setup router
	r := router.NewRouter(jwtManager, authHandler, recordHandler, leaderboardHandler)
	engine := r.Setup()

	// Start server
	log.Printf("Server starting on port %s", cfg.Server.Port)
	if err := engine.Run(":" + cfg.Server.Port); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
