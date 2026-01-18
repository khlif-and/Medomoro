package repository

import (
	"encoding/json"
	"os"
	"sync"
	"wails-app/internal/model"
)

type MemoRepository struct {
	filename string
	mutex    sync.RWMutex
}

func NewMemoRepository(filename string) *MemoRepository {
	return &MemoRepository{
		filename: filename,
	}
}

func (r *MemoRepository) Load() ([]model.StickyNote, error) {
	r.mutex.RLock()
	defer r.mutex.RUnlock()

	file, err := os.ReadFile(r.filename)
	if err != nil {
		if os.IsNotExist(err) {
			return []model.StickyNote{}, nil
		}
		return nil, err
	}

	var memos []model.StickyNote
	if err := json.Unmarshal(file, &memos); err != nil {
		return nil, err
	}
	return memos, nil
}

func (r *MemoRepository) Save(memos []model.StickyNote) error {
	r.mutex.Lock()
	defer r.mutex.Unlock()

	data, err := json.MarshalIndent(memos, "", "  ")
	if err != nil {
		return err
	}
	return os.WriteFile(r.filename, data, 0644)
}
