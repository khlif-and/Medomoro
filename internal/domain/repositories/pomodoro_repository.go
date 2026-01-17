package repositories

import (
	"encoding/json"
	"os"
	"path/filepath"
	"time"

	"wails-app/internal/domain/models"
)

type PomodoroRepository struct {
	statsFile  string
	globalFile string
}

func NewPomodoroRepository(appDataDir string) *PomodoroRepository {
	brainDir := filepath.Join(appDataDir, "brain", "pomodoro")
	os.MkdirAll(brainDir, 0755)

	return &PomodoroRepository{
		statsFile:  filepath.Join(brainDir, "daily_stats.json"),
		globalFile: filepath.Join(brainDir, "global_stats.json"),
	}
}

func (r *PomodoroRepository) GetTodayStats() (*models.PomodoroStat, error) {
	stats, err := r.loadAllStats()
	if err != nil {
		return nil, err
	}

	today := time.Now().Format("2006-01-02")
	if stat, exists := stats[today]; exists {
		return &stat, nil
	}

	return &models.PomodoroStat{Date: today}, nil
}

func (r *PomodoroRepository) GetWeekStats() ([]models.PomodoroStat, error) {
	stats, err := r.loadAllStats()
	if err != nil {
		return nil, err
	}

	var week []models.PomodoroStat
	now := time.Now()
	// Get last 7 days including today
	for i := 6; i >= 0; i-- {
		day := now.AddDate(0, 0, -i).Format("2006-01-02")
		if stat, exists := stats[day]; exists {
			week = append(week, stat)
		} else {
			week = append(week, models.PomodoroStat{Date: day})
		}
	}
	return week, nil
}

func (r *PomodoroRepository) UpdateStats(minutes int) (*models.PomodoroStat, error) {
	stats, err := r.loadAllStats()
	if err != nil {
		return nil, err
	}

	today := time.Now().Format("2006-01-02")
	stat, exists := stats[today]
	if !exists {
		stat = models.PomodoroStat{
			Date:      today,
			CreatedAt: time.Now(),
		}
	}

	stat.FocusMinutes += minutes
	stat.Sessions++
	stat.UpdatedAt = time.Now()
	stats[today] = stat

	if err := r.saveAllStats(stats); err != nil {
		return nil, err
	}

	return &stat, nil
}

func (r *PomodoroRepository) GetGlobalStats() (*models.GlobalPomodoroStats, error) {
	data, err := os.ReadFile(r.globalFile)
	if os.IsNotExist(err) {
		return &models.GlobalPomodoroStats{}, nil
	}
	if err != nil {
		return nil, err
	}

	var stats models.GlobalPomodoroStats
	json.Unmarshal(data, &stats)
	return &stats, nil
}

func (r *PomodoroRepository) UpdateStreak(todayMinutes int) (*models.GlobalPomodoroStats, error) {
	global, err := r.GetGlobalStats()
	if err != nil {
		return nil, err
	}

	today := time.Now().Format("2006-01-02")

	// Only update streak logic if enough minutes accumulated
	if todayMinutes >= 15 && global.LastFocusDate != today {
		yesterday := time.Now().AddDate(0, 0, -1).Format("2006-01-02")

		if global.LastFocusDate == yesterday {
			global.CurrentStreak++
		} else {
			global.CurrentStreak = 1 // Reset if not consecutive (or first time)
		}
		global.LastFocusDate = today

		// Save
		data, _ := json.MarshalIndent(global, "", "  ")
		os.WriteFile(r.globalFile, data, 0644)
	}

	return global, nil
}

// Helpers

func (r *PomodoroRepository) loadAllStats() (map[string]models.PomodoroStat, error) {
	data, err := os.ReadFile(r.statsFile)
	if os.IsNotExist(err) {
		return make(map[string]models.PomodoroStat), nil
	}

	var stats map[string]models.PomodoroStat
	json.Unmarshal(data, &stats)
	return stats, nil
}

func (r *PomodoroRepository) saveAllStats(stats map[string]models.PomodoroStat) error {
	data, err := json.MarshalIndent(stats, "", "  ")
	if err != nil {
		return err
	}
	return os.WriteFile(r.statsFile, data, 0644)
}
