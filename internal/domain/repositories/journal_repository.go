package repositories

import (
	"encoding/json"
	"os"
	"path/filepath"
	"sort"
	"time"

	"wails-app/internal/domain/models"

	"github.com/google/uuid"
)

type JournalRepository struct {
	filePath string
}

func NewJournalRepository(appDataDir string) *JournalRepository {
	brainDir := filepath.Join(appDataDir, "brain", "journal")
	os.MkdirAll(brainDir, 0755)
	return &JournalRepository{
		filePath: filepath.Join(brainDir, "entries.json"),
	}
}

func (r *JournalRepository) GetAll() ([]models.JournalEntry, error) {
	data, err := os.ReadFile(r.filePath)
	if os.IsNotExist(err) {
		return []models.JournalEntry{}, nil
	}
	if err != nil {
		return nil, err
	}

	var entries []models.JournalEntry
	if err := json.Unmarshal(data, &entries); err != nil {
		return nil, err
	}

	// Sort by CreatedAt desc
	sort.Slice(entries, func(i, j int) bool {
		return entries[i].CreatedAt.After(entries[j].CreatedAt)
	})

	return entries, nil
}

func (r *JournalRepository) Create(title, content, mood string) (*models.JournalEntry, error) {
	entries, _ := r.GetAll()

	entry := models.JournalEntry{
		ID:        uuid.New().String(),
		Title:     title,
		Content:   content,
		Mood:      mood,
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}

	entries = append(entries, entry)
	if err := r.save(entries); err != nil {
		return nil, err
	}

	return &entry, nil
}

func (r *JournalRepository) Update(id, title, content, mood string) (*models.JournalEntry, error) {
	entries, _ := r.GetAll()
	var updated *models.JournalEntry

	for i, e := range entries {
		if e.ID == id {
			entries[i].Title = title
			entries[i].Content = content
			entries[i].Mood = mood
			entries[i].UpdatedAt = time.Now()
			updated = &entries[i]
			break
		}
	}

	if updated == nil {
		return nil, nil
	}

	if err := r.save(entries); err != nil {
		return nil, err
	}

	return updated, nil
}

func (r *JournalRepository) Delete(id string) error {
	entries, _ := r.GetAll()
	newEntries := make([]models.JournalEntry, 0)

	for _, e := range entries {
		if e.ID != id {
			newEntries = append(newEntries, e)
		}
	}

	return r.save(newEntries)
}

func (r *JournalRepository) save(entries []models.JournalEntry) error {
	data, err := json.MarshalIndent(entries, "", "  ")
	if err != nil {
		return err
	}
	return os.WriteFile(r.filePath, data, 0644)
}
