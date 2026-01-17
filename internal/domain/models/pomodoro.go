package models

import "time"

// PomodoroStat represents daily pomodoro statistics
type PomodoroStat struct {
	ID           string    `json:"id"`
	Date         string    `json:"date"` // YYYY-MM-DD
	FocusMinutes int       `json:"focus_minutes"`
	Sessions     int       `json:"sessions"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
}

type GlobalPomodoroStats struct {
	CurrentStreak int    `json:"current_streak"`
	LastFocusDate string `json:"last_focus_date"` // YYYY-MM-DD used for streak calculation
}
