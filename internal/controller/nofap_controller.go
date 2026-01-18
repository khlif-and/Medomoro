package controller

import (
	"context"
	"time"
	"wails-app/internal/model"
	"wails-app/internal/repository"
)

type NoFapController struct {
	ctx  context.Context
	repo *repository.NoFapRepository
}

func NewNoFapController(repo *repository.NoFapRepository) *NoFapController {
	return &NoFapController{
		repo: repo,
	}
}

func (c *NoFapController) Startup(ctx context.Context) {
	c.ctx = ctx
}

func (c *NoFapController) GetEntries() ([]model.NoFapEntry, error) {
	return c.repo.LoadAll()
}

func (c *NoFapController) LogToday(status string, urge int, notes string) (model.NoFapStats, error) {
	entries, err := c.repo.LoadAll()
	if err != nil {
		return model.NoFapStats{}, err
	}

	today := time.Now().Format("2006-01-02")
	found := false
	for i, e := range entries {
		if e.Date == today {
			entries[i].Status = status
			entries[i].UrgeLevel = urge
			entries[i].Notes = notes
			found = true
			break
		}
	}

	if !found {
		entries = append(entries, model.NoFapEntry{
			Date:      today,
			Status:    status,
			UrgeLevel: urge,
			Notes:     notes,
		})
	}

	if err := c.repo.Save(entries); err != nil {
		return model.NoFapStats{}, err
	}

	return c.repo.CalculateStats(entries), nil
}

func (c *NoFapController) GetStats() (model.NoFapStats, error) {
	entries, err := c.repo.LoadAll()
	if err != nil {
		return model.NoFapStats{}, err
	}
	return c.repo.CalculateStats(entries), nil
}

// GetLog returns today's log if exists
func (c *NoFapController) GetTodayLog() (model.NoFapEntry, error) {
	entries, err := c.repo.LoadAll()
	if err != nil {
		return model.NoFapEntry{}, err
	}
	today := time.Now().Format("2006-01-02")
	for _, e := range entries {
		if e.Date == today {
			return e, nil
		}
	}
	return model.NoFapEntry{}, nil
}
