package service

import (
	"ptype-backend/internal/model"
	"ptype-backend/internal/repository"
)

type RecordService struct {
	recordRepo *repository.RecordRepository
}

func NewRecordService(recordRepo *repository.RecordRepository) *RecordService {
	return &RecordService{recordRepo: recordRepo}
}

func (s *RecordService) Create(userID uint, req *model.RecordCreateRequest) (*model.Record, error) {
	record := &model.Record{
		UserID:     userID,
		Mode:       req.Mode,
		Duration:   req.Duration,
		WPM:        req.WPM,
		Accuracy:   req.Accuracy,
		Characters: req.Characters,
		Errors:     req.Errors,
		WPMHistory: req.WPMHistory,
	}

	if err := s.recordRepo.Create(record); err != nil {
		return nil, err
	}

	return record, nil
}

func (s *RecordService) GetUserRecords(userID uint, limit, offset int) ([]model.RecordResponse, error) {
	if limit <= 0 {
		limit = 20
	}
	if limit > 100 {
		limit = 100
	}

	records, err := s.recordRepo.FindByUserID(userID, limit, offset)
	if err != nil {
		return nil, err
	}

	responses := make([]model.RecordResponse, len(records))
	for i, r := range records {
		responses[i] = r.ToResponse()
	}

	return responses, nil
}

func (s *RecordService) GetUserStats(userID uint) (*model.UserStats, error) {
	return s.recordRepo.GetUserStats(userID)
}

func (s *RecordService) GetLeaderboard(mode string, duration int, limit int) ([]model.RecordResponse, error) {
	if limit <= 0 {
		limit = 50
	}
	if limit > 100 {
		limit = 100
	}

	records, err := s.recordRepo.GetLeaderboard(mode, duration, limit)
	if err != nil {
		return nil, err
	}

	responses := make([]model.RecordResponse, len(records))
	for i, r := range records {
		responses[i] = r.ToResponse()
	}

	return responses, nil
}
