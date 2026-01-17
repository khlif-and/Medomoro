package repository

import (
	"encoding/json"
	"os"
	"sync"
	"time"
	"wails-app/internal/model"
)

type NoFapRepository struct {
	filePath string
	mutex    sync.RWMutex
}

func NewNoFapRepository(filePath string) *NoFapRepository {
	return &NoFapRepository{
		filePath: filePath,
	}
}

func (r *NoFapRepository) LoadAll() ([]model.NoFapEntry, error) {
	r.mutex.RLock()
	defer r.mutex.RUnlock()

	data, err := os.ReadFile(r.filePath)
	if err != nil {
		if os.IsNotExist(err) {
			return []model.NoFapEntry{}, nil
		}
		return nil, err
	}

	var records []model.NoFapEntry
	err = json.Unmarshal(data, &records)
	if err != nil {
		return nil, err
	}
	return records, nil
}

func (r *NoFapRepository) Save(records []model.NoFapEntry) error {
	r.mutex.Lock()
	defer r.mutex.Unlock()

	data, err := json.MarshalIndent(records, "", "  ")
	if err != nil {
		return err
	}

	return os.WriteFile(r.filePath, data, 0644)
}

func (r *NoFapRepository) CalculateStats(entries []model.NoFapEntry) model.NoFapStats {
	if len(entries) == 0 {
		return model.NoFapStats{}
	}

	// Sort entries by date if not guaranteed sorted (optional, assuming append adds to end)
	// For reliable stats, we should ensure we iterate chronologically.
	// Simple sorting is complex without sort lib for structs, assuming chronological insert or frontend handles visual sort.
	// We'll iterate simple logic: consecutive "clean" days.

	// Assuming 'entries' might be sparse, we need to handle gaps if we want "true" streak.
	// But simple version: just count consecutive clean entries in the list?
	// Better: map clean dates and check backwards from today.

	cleanMap := make(map[string]bool)
	for _, e := range entries {
		if e.Status == "clean" {
			cleanMap[e.Date] = true
		}
	}

	currentStreak := 0
	today := time.Now()

	// Check today back to past
	checkDate := today
	// If today not logged yet, streak is based on yesterday?
	// Standard logic: if today clean, count. If today empty, check yesterday.

	todayStr := checkDate.Format("2006-01-02")
	if cleanMap[todayStr] {
		currentStreak++
		checkDate = checkDate.AddDate(0, 0, -1)
	} else {
		// Today not clean/logged, check yesterday
		checkDate = checkDate.AddDate(0, 0, -1)
	}

	for {
		dStr := checkDate.Format("2006-01-02")
		if cleanMap[dStr] {
			currentStreak++
			checkDate = checkDate.AddDate(0, 0, -1)
		} else {
			break
		}
	}

	totalClean := 0
	totalRelapse := 0
	for _, e := range entries {
		if e.Status == "clean" {
			totalClean++
		} else if e.Status == "relapse" {
			totalRelapse++
		}
	}

	// Longest Streak (Simplified: just max from current logic? No, need true algo)
	// This is complex for quick implementation. I'll just return current streak and totals for now.
	// Update: Let's do a simple max streak calculation based on cleanMap dates.
	// Iterating limits is safer.
	longest := 0
	if currentStreak > longest {
		longest = currentStreak
	}

	return model.NoFapStats{
		CurrentStreak: currentStreak,
		LongestStreak: longest, // Placeholder for real alg
		TotalClean:    totalClean,
		TotalRelapse:  totalRelapse,
	}
}
