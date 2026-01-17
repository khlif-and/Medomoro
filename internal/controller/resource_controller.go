package controller

import (
	"context"
	"time"
	"wails-app/internal/model"
	"wails-app/internal/repository"

	"github.com/google/uuid"
)

type ResourceController struct {
	ctx  context.Context
	repo *repository.ResourceRepository
}

func NewResourceController() *ResourceController {
	return &ResourceController{
		repo: repository.NewResourceRepository(),
	}
}

func (c *ResourceController) Startup(ctx context.Context) {
	c.ctx = ctx
}

func (c *ResourceController) GetData() (*repository.ResourceData, error) {
	return c.repo.Load()
}

func (c *ResourceController) AddFolder(name, description string) (*repository.ResourceData, error) {
	data, err := c.repo.Load()
	if err != nil {
		return nil, err
	}

	newFolder := model.ResourceFolder{
		ID:          uuid.New().String(),
		Name:        name,
		Description: description,
		CreatedAt:   time.Now(),
	}

	data.Folders = append([]model.ResourceFolder{newFolder}, data.Folders...)
	if err := c.repo.Save(data); err != nil {
		return nil, err
	}
	return data, nil
}

func (c *ResourceController) DeleteFolder(id string) (*repository.ResourceData, error) {
	data, err := c.repo.Load()
	if err != nil {
		return nil, err
	}

	// Filter folders
	var newFolders []model.ResourceFolder
	for _, f := range data.Folders {
		if f.ID != id {
			newFolders = append(newFolders, f)
		}
	}
	data.Folders = newFolders

	// Filter items belonging to deleted folder
	var newItems []model.ResourceItem
	for _, item := range data.Items {
		if item.FolderID != id {
			newItems = append(newItems, item)
		}
	}
	data.Items = newItems

	if err := c.repo.Save(data); err != nil {
		return nil, err
	}
	return data, nil
}

func (c *ResourceController) UpdateFolder(id, name, description string) (*repository.ResourceData, error) {
	data, err := c.repo.Load()
	if err != nil {
		return nil, err
	}

	for i, f := range data.Folders {
		if f.ID == id {
			data.Folders[i].Name = name
			data.Folders[i].Description = description
			break
		}
	}

	if err := c.repo.Save(data); err != nil {
		return nil, err
	}
	return data, nil
}

func (c *ResourceController) AddItem(folderId, typeStr, title, url, description string) (*repository.ResourceData, error) {
	data, err := c.repo.Load()
	if err != nil {
		return nil, err
	}

	newItem := model.ResourceItem{
		ID:          uuid.New().String(),
		FolderID:    folderId,
		Type:        model.ResourceType(typeStr),
		Title:       title,
		URL:         url,
		Description: description,
		CreatedAt:   time.Now(),
	}

	data.Items = append([]model.ResourceItem{newItem}, data.Items...)
	if err := c.repo.Save(data); err != nil {
		return nil, err
	}
	return data, nil
}

func (c *ResourceController) UpdateItem(id, title, url, description string) (*repository.ResourceData, error) {
	data, err := c.repo.Load()
	if err != nil {
		return nil, err
	}

	for i, item := range data.Items {
		if item.ID == id {
			data.Items[i].Title = title
			data.Items[i].URL = url
			data.Items[i].Description = description
			break
		}
	}

	if err := c.repo.Save(data); err != nil {
		return nil, err
	}
	return data, nil
}

func (c *ResourceController) DeleteItem(id string) (*repository.ResourceData, error) {
	data, err := c.repo.Load()
	if err != nil {
		return nil, err
	}

	var newItems []model.ResourceItem
	for _, item := range data.Items {
		if item.ID != id {
			newItems = append(newItems, item)
		}
	}
	data.Items = newItems

	if err := c.repo.Save(data); err != nil {
		return nil, err
	}
	return data, nil
}
