package model

type Task struct {
	ID        string `json:"id"`
	Title     string `json:"title"`
	Content   string `json:"content"`
	IsDone    bool   `json:"isDone"`
	CreatedAt string `json:"createdAt"`
}
