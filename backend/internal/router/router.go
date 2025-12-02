package router

import (
	"github.com/gin-gonic/gin"

	"ptype-backend/internal/handler"
	"ptype-backend/internal/middleware"
	"ptype-backend/pkg/jwt"
)

type Router struct {
	engine            *gin.Engine
	jwtManager        *jwt.JWTManager
	authHandler       *handler.AuthHandler
	recordHandler     *handler.RecordHandler
	leaderboardHandler *handler.LeaderboardHandler
}

func NewRouter(
	jwtManager *jwt.JWTManager,
	authHandler *handler.AuthHandler,
	recordHandler *handler.RecordHandler,
	leaderboardHandler *handler.LeaderboardHandler,
) *Router {
	return &Router{
		engine:            gin.Default(),
		jwtManager:        jwtManager,
		authHandler:       authHandler,
		recordHandler:     recordHandler,
		leaderboardHandler: leaderboardHandler,
	}
}

func (r *Router) Setup() *gin.Engine {
	r.engine.Use(middleware.CORSMiddleware())

	api := r.engine.Group("/api")
	{
		// Auth routes (public)
		auth := api.Group("/auth")
		{
			auth.POST("/register", r.authHandler.Register)
			auth.POST("/login", r.authHandler.Login)
			auth.GET("/me", middleware.AuthMiddleware(r.jwtManager), r.authHandler.Me)
		}

		// Record routes (protected)
		records := api.Group("/records")
		records.Use(middleware.AuthMiddleware(r.jwtManager))
		{
			records.POST("", r.recordHandler.Create)
			records.GET("", r.recordHandler.GetUserRecords)
			records.GET("/stats", r.recordHandler.GetUserStats)
		}

		// Leaderboard routes (public)
		api.GET("/leaderboard", r.leaderboardHandler.GetLeaderboard)
	}

	return r.engine
}
