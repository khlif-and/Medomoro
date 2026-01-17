package model

import "time"

type ResourceType string

const (
	ResourceTypePDF  ResourceType = "pdf"
	ResourceTypeLink ResourceType = "link"
)

type ResourceFolder struct {
	ID          string    `json:"id"`
	Name        string    `json:"name"`
	Description string    `json:"description"`
	CreatedAt   time.Time `json:"createdAt"`
}

type ResourceItem struct {
	ID          string       `json:"id"`
	FolderID    string       `json:"folderId"`
	Type        ResourceType `json:"type"`
	Title       string       `json:"title"`
	URL         string       `json:"url"`
	Description string       `json:"description"`
	CreatedAt   time.Time    `json:"createdAt"`
}
