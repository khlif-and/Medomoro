package controller

import (
	"context"
	"time"
	"wails-app/internal/model"
	"wails-app/internal/repository"

	"github.com/google/uuid"
)

type FlashcardController struct {
	ctx  context.Context
	repo *repository.FlashcardRepository
}

func NewFlashcardController() *FlashcardController {
	return &FlashcardController{
		repo: repository.NewFlashcardRepository(),
	}
}

func (c *FlashcardController) Startup(ctx context.Context) {
	c.ctx = ctx
}

func (c *FlashcardController) GetFlashcards() ([]model.Flashcard, error) {
	return c.repo.Load()
}

func (c *FlashcardController) AddFlashcard(question, answer string) ([]model.Flashcard, error) {
	cards, err := c.repo.Load()
	if err != nil {
		return nil, err
	}

	newCard := model.Flashcard{
		ID:        uuid.New().String(),
		Question:  question,
		Answer:    answer,
		CreatedAt: time.Now(),
	}

	cards = append([]model.Flashcard{newCard}, cards...)
	if err := c.repo.Save(cards); err != nil {
		return nil, err
	}
	return cards, nil
}

func (c *FlashcardController) UpdateFlashcard(updatedCard model.Flashcard) ([]model.Flashcard, error) {
	cards, err := c.repo.Load()
	if err != nil {
		return nil, err
	}

	for i, c := range cards {
		if c.ID == updatedCard.ID {
			cards[i] = updatedCard
			break
		}
	}

	if err := c.repo.Save(cards); err != nil {
		return nil, err
	}
	return cards, nil
}

func (c *FlashcardController) DeleteFlashcard(id string) ([]model.Flashcard, error) {
	cards, err := c.repo.Load()
	if err != nil {
		return nil, err
	}

	var newCards []model.Flashcard
	for _, c := range cards {
		if c.ID != id {
			newCards = append(newCards, c)
		}
	}

	if err := c.repo.Save(newCards); err != nil {
		return nil, err
	}
	return newCards, nil
}
