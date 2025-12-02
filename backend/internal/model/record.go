package model

import (
	"database/sql/driver"
	"encoding/json"
	"errors"
	"time"
)

type Mode string

const (
	ModeEnglish Mode = "english"
	ModeChinese Mode = "chinese"
	ModeCoder   Mode = "coder"
)

type WPMHistory []WPMPoint

type WPMPoint struct {
	Time int     `json:"time"`
	WPM  float64 `json:"wpm"`
}

func (w WPMHistory) Value() (driver.Value, error) {
	return json.Marshal(w)
}

func (w *WPMHistory) Scan(value interface{}) error {
	bytes, ok := value.([]byte)
	if !ok {
		return errors.New("type assertion to []byte failed")
	}
	return json.Unmarshal(bytes, w)
}

type Record struct {
	ID         uint       `gorm:"primaryKey" json:"id"`
	UserID     uint       `gorm:"index;not null" json:"user_id"`
	Mode       Mode       `gorm:"type:enum('english','chinese','coder');not null" json:"mode"`
	Duration   int        `gorm:"not null" json:"duration"`
	WPM        float64    `gorm:"type:decimal(6,2);not null" json:"wpm"`
	Accuracy   float64    `gorm:"type:decimal(5,2);not null" json:"accuracy"`
	Characters int        `gorm:"not null" json:"characters"`
	Errors     int        `gorm:"not null" json:"errors"`
	WPMHistory WPMHistory `gorm:"type:json" json:"wpm_history"`
	CreatedAt  time.Time  `json:"created_at"`

	User User `gorm:"foreignKey:UserID" json:"user,omitempty"`
}

type RecordCreateRequest struct {
	Mode       Mode       `json:"mode" binding:"required,oneof=english chinese coder"`
	Duration   int        `json:"duration" binding:"required,min=15"`
	WPM        float64    `json:"wpm" binding:"required,min=0"`
	Accuracy   float64    `json:"accuracy" binding:"required,min=0,max=100"`
	Characters int        `json:"characters" binding:"required,min=0"`
	Errors     int        `json:"errors" binding:"min=0"`
	WPMHistory WPMHistory `json:"wpm_history"`
}

type RecordResponse struct {
	ID         uint       `json:"id"`
	UserID     uint       `json:"user_id"`
	Username   string     `json:"username,omitempty"`
	Mode       Mode       `json:"mode"`
	Duration   int        `json:"duration"`
	WPM        float64    `json:"wpm"`
	Accuracy   float64    `json:"accuracy"`
	Characters int        `json:"characters"`
	Errors     int        `json:"errors"`
	WPMHistory WPMHistory `json:"wpm_history,omitempty"`
	CreatedAt  time.Time  `json:"created_at"`
}

type UserStats struct {
	TotalTests     int     `json:"total_tests"`
	TotalTime      int     `json:"total_time"`
	AverageWPM     float64 `json:"average_wpm"`
	BestWPM        float64 `json:"best_wpm"`
	AverageAccuracy float64 `json:"average_accuracy"`
}

func (r *Record) ToResponse() RecordResponse {
	resp := RecordResponse{
		ID:         r.ID,
		UserID:     r.UserID,
		Mode:       r.Mode,
		Duration:   r.Duration,
		WPM:        r.WPM,
		Accuracy:   r.Accuracy,
		Characters: r.Characters,
		Errors:     r.Errors,
		WPMHistory: r.WPMHistory,
		CreatedAt:  r.CreatedAt,
	}
	if r.User.ID != 0 {
		resp.Username = r.User.Username
	}
	return resp
}
