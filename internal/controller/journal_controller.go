package controller

import (
	"context"
	"wails-app/internal/domain/models"
	"wails-app/internal/domain/repositories"
)

type JournalController struct {
	ctx  context.Context
	repo *repositories.JournalRepository
}

func NewJournalController(repo *repositories.JournalRepository) *JournalController {
	return &JournalController{repo: repo}
}

func (c *JournalController) Startup(ctx context.Context) {
	c.ctx = ctx
}

func (c *JournalController) GetEntries() ([]models.JournalEntry, error) {
	return c.repo.GetAll()
}

func (c *JournalController) CreateEntry(title, content, mood string) (*models.JournalEntry, error) {
	return c.repo.Create(title, content, mood)
}

func (c *JournalController) UpdateEntry(id, title, content, mood string) (*models.JournalEntry, error) {
	return c.repo.Update(id, title, content, mood)
}

func (c *JournalController) DeleteEntry(id string) error {
	return c.repo.Delete(id)
}
