package handler

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"

	"ptype-backend/internal/service"
)

type LeaderboardHandler struct {
	recordService *service.RecordService
}

func NewLeaderboardHandler(recordService *service.RecordService) *LeaderboardHandler {
	return &LeaderboardHandler{recordService: recordService}
}

func (h *LeaderboardHandler) GetLeaderboard(c *gin.Context) {
	mode := c.Query("mode")
	duration, _ := strconv.Atoi(c.Query("duration"))
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "50"))

	records, err := h.recordService.GetLeaderboard(mode, duration, limit)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to get leaderboard"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"leaderboard": records})
}
