package repository

import (
	"encoding/json"
	"os"
	"sync"
	"wails-app/internal/model"
)

type FlashcardRepository struct {
	filename string
	mutex    sync.RWMutex
}

func NewFlashcardRepository(filename string) *FlashcardRepository {
	return &FlashcardRepository{
		filename: filename,
	}
}

func (r *FlashcardRepository) Load() ([]model.Flashcard, error) {
	r.mutex.RLock()
	defer r.mutex.RUnlock()

	file, err := os.ReadFile(r.filename)
	if err != nil {
		if os.IsNotExist(err) {
			return []model.Flashcard{}, nil
		}
		return nil, err
	}

	var cards []model.Flashcard
	if err := json.Unmarshal(file, &cards); err != nil {
		return nil, err
	}
	return cards, nil
}

func (r *FlashcardRepository) Save(cards []model.Flashcard) error {
	r.mutex.Lock()
	defer r.mutex.Unlock()

	data, err := json.MarshalIndent(cards, "", "  ")
	if err != nil {
		return err
	}
	return os.WriteFile(r.filename, data, 0644)
}
