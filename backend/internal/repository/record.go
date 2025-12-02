package repository

import (
	"gorm.io/gorm"

	"ptype-backend/internal/model"
)

type RecordRepository struct {
	db *gorm.DB
}

func NewRecordRepository(db *gorm.DB) *RecordRepository {
	return &RecordRepository{db: db}
}

func (r *RecordRepository) Create(record *model.Record) error {
	return r.db.Create(record).Error
}

func (r *RecordRepository) FindByUserID(userID uint, limit, offset int) ([]model.Record, error) {
	var records []model.Record
	err := r.db.Where("user_id = ?", userID).
		Order("created_at DESC").
		Limit(limit).
		Offset(offset).
		Find(&records).Error
	return records, err
}

func (r *RecordRepository) GetUserStats(userID uint) (*model.UserStats, error) {
	var stats model.UserStats

	err := r.db.Model(&model.Record{}).
		Where("user_id = ?", userID).
		Select(`
			COUNT(*) as total_tests,
			COALESCE(SUM(duration), 0) as total_time,
			COALESCE(AVG(wpm), 0) as average_wpm,
			COALESCE(MAX(wpm), 0) as best_wpm,
			COALESCE(AVG(accuracy), 0) as average_accuracy
		`).
		Scan(&stats).Error

	return &stats, err
}

func (r *RecordRepository) GetLeaderboard(mode string, duration int, limit int) ([]model.Record, error) {
	var records []model.Record

	query := r.db.Preload("User")

	if mode != "" {
		query = query.Where("mode = ?", mode)
	}
	if duration > 0 {
		query = query.Where("duration = ?", duration)
	}

	err := query.Order("wpm DESC").
		Limit(limit).
		Find(&records).Error

	return records, err
}
