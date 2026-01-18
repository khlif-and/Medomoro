package controller

import (
	"context"
	"time"
	"wails-app/internal/model"
	"wails-app/internal/repository"
)

type MuslimController struct {
	ctx  context.Context
	repo *repository.MuslimRepository
}

func NewMuslimController(repo *repository.MuslimRepository) *MuslimController {
	return &MuslimController{
		repo: repo,
	}
}

func (c *MuslimController) Startup(ctx context.Context) {
	c.ctx = ctx
}

func (c *MuslimController) GetTodayIbadah() (model.DailyIbadah, error) {
	records, err := c.repo.LoadAll()
	if err != nil {
		return model.DailyIbadah{}, err
	}

	todayKey := time.Now().Format("2006-01-02")
	for _, rec := range records {
		if rec.Date == todayKey {
			return rec, nil
		}
	}

	// Create new empty for today
	return model.DailyIbadah{
		Date: todayKey,
		// Init other defaults if needed
	}, nil
}

func (c *MuslimController) GetWeeklyStats() ([]model.DailyIbadah, error) {
	records, err := c.repo.LoadAll()
	if err != nil {
		return nil, err
	}

	recordMap := make(map[string]model.DailyIbadah)
	for _, rec := range records {
		recordMap[rec.Date] = rec
	}

	var week []model.DailyIbadah
	now := time.Now()
	// Last 7 days including today
	for i := 6; i >= 0; i-- {
		day := now.AddDate(0, 0, -i).Format("2006-01-02")
		if rec, exists := recordMap[day]; exists {
			week = append(week, rec)
		} else {
			week = append(week, model.DailyIbadah{Date: day})
		}
	}

	return week, nil
}

func (c *MuslimController) SaveIbadah(ibadah model.DailyIbadah) (bool, error) {
	records, err := c.repo.LoadAll()
	if err != nil {
		return false, err
	}

	found := false
	for i, rec := range records {
		if rec.Date == ibadah.Date {
			records[i] = ibadah
			found = true
			break
		}
	}

	if !found {
		records = append(records, ibadah)
	}

	if err := c.repo.Save(records); err != nil {
		return false, err
	}
	return true, nil
}
