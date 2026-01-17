package repository

import (
	"encoding/json"
	"os"
	"sync"
	"wails-app/internal/model"
)

type MuslimRepository struct {
	filePath string
	mutex    sync.RWMutex
}

func NewMuslimRepository(filePath string) *MuslimRepository {
	return &MuslimRepository{
		filePath: filePath,
	}
}

func (r *MuslimRepository) LoadAll() ([]model.DailyIbadah, error) {
	r.mutex.RLock()
	defer r.mutex.RUnlock()

	data, err := os.ReadFile(r.filePath)
	if err != nil {
		if os.IsNotExist(err) {
			return []model.DailyIbadah{}, nil
		}
		return nil, err
	}

	var records []model.DailyIbadah
	err = json.Unmarshal(data, &records)
	if err != nil {
		return nil, err
	}
	return records, nil
}

func (r *MuslimRepository) Save(records []model.DailyIbadah) error {
	r.mutex.Lock()
	defer r.mutex.Unlock()

	data, err := json.MarshalIndent(records, "", "  ")
	if err != nil {
		return err
	}

	return os.WriteFile(r.filePath, data, 0644)
}
