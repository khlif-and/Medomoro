package controller

import (
	"context"
	"time"
	"wails-app/internal/model"
	"wails-app/internal/repository"

	"github.com/google/uuid"
)

type MemoController struct {
	ctx  context.Context
	repo *repository.MemoRepository
}

func NewMemoController(repo *repository.MemoRepository) *MemoController {
	return &MemoController{
		repo: repo,
	}
}

func (c *MemoController) Startup(ctx context.Context) {
	c.ctx = ctx
}

func (c *MemoController) GetMemos() ([]model.StickyNote, error) {
	return c.repo.Load()
}

func (c *MemoController) AddMemo(content string, color string) ([]model.StickyNote, error) {
	memos, err := c.repo.Load()
	if err != nil {
		return nil, err
	}

	newMemo := model.StickyNote{
		ID:        uuid.New().String(),
		Content:   content,
		Color:     color,
		CreatedAt: time.Now(),
	}

	memos = append([]model.StickyNote{newMemo}, memos...) // Prepend
	if err := c.repo.Save(memos); err != nil {
		return nil, err
	}
	return memos, nil
}

func (c *MemoController) UpdateMemo(updatedMemo model.StickyNote) ([]model.StickyNote, error) {
	memos, err := c.repo.Load()
	if err != nil {
		return nil, err
	}

	for i, m := range memos {
		if m.ID == updatedMemo.ID {
			memos[i] = updatedMemo
			break
		}
	}

	if err := c.repo.Save(memos); err != nil {
		return nil, err
	}
	return memos, nil
}

func (c *MemoController) DeleteMemo(id string) ([]model.StickyNote, error) {
	memos, err := c.repo.Load()
	if err != nil {
		return nil, err
	}

	var newMemos []model.StickyNote
	for _, m := range memos {
		if m.ID != id {
			newMemos = append(newMemos, m)
		}
	}

	if err := c.repo.Save(newMemos); err != nil {
		return nil, err
	}
	return newMemos, nil
}
