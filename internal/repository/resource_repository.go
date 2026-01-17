package repository

import (
	"encoding/json"
	"os"
	"sync"
	"wails-app/internal/model"
)

type ResourceData struct {
	Folders []model.ResourceFolder `json:"folders"`
	Items   []model.ResourceItem   `json:"items"`
}

type ResourceRepository struct {
	filename string
	mutex    sync.RWMutex
}

func NewResourceRepository() *ResourceRepository {
	return &ResourceRepository{
		filename: "resources.json",
	}
}

func (r *ResourceRepository) Load() (*ResourceData, error) {
	r.mutex.RLock()
	defer r.mutex.RUnlock()

	file, err := os.ReadFile(r.filename)
	if err != nil {
		if os.IsNotExist(err) {
			return &ResourceData{Folders: []model.ResourceFolder{}, Items: []model.ResourceItem{}}, nil
		}
		return nil, err
	}

	var data ResourceData
	if err := json.Unmarshal(file, &data); err != nil {
		return nil, err
	}
	return &data, nil
}

func (r *ResourceRepository) Save(data *ResourceData) error {
	r.mutex.Lock()
	defer r.mutex.Unlock()

	bytes, err := json.MarshalIndent(data, "", "  ")
	if err != nil {
		return err
	}
	return os.WriteFile(r.filename, bytes, 0644)
}
