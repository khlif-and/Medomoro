package controller

import (
	"context"
	"wails-app/internal/domain/models"
	"wails-app/internal/domain/repositories"
)

type PomodoroController struct {
	ctx  context.Context
	repo *repositories.PomodoroRepository
}

func NewPomodoroController(repo *repositories.PomodoroRepository) *PomodoroController {
	return &PomodoroController{repo: repo}
}

func (c *PomodoroController) Startup(ctx context.Context) {
	c.ctx = ctx
}

type PomodoroDashboardData struct {
	Today  *models.PomodoroStat        `json:"today"`
	Global *models.GlobalPomodoroStats `json:"global"`
	Week   []models.PomodoroStat       `json:"week"`
}

func (c *PomodoroController) GetPomodoroData() (*PomodoroDashboardData, error) {
	today, err := c.repo.GetTodayStats()
	if err != nil {
		return nil, err
	}

	global, err := c.repo.GetGlobalStats()
	if err != nil {
		return nil, err
	}

	week, err := c.repo.GetWeekStats()
	if err != nil {
		return nil, err
	}

	return &PomodoroDashboardData{Today: today, Global: global, Week: week}, nil
}

func (c *PomodoroController) RecordSession(minutes int) (*PomodoroDashboardData, error) {
	today, err := c.repo.UpdateStats(minutes)
	if err != nil {
		return nil, err
	}

	// Update streak if applicable
	global, err := c.repo.UpdateStreak(today.FocusMinutes)
	if err != nil {
		return nil, err
	}

	week, err := c.repo.GetWeekStats()
	if err != nil {
		return nil, err
	}

	return &PomodoroDashboardData{Today: today, Global: global, Week: week}, nil
}
