package model

type Task struct {
	ID            string `json:"id"`
	Title         string `json:"title"`
	Content       string `json:"content"`
	IsDone        bool   `json:"isDone"`
	CreatedAt     string `json:"createdAt"`
	ScheduledDate string `json:"scheduledDate"` // YYYY-MM-DD
	ScheduledTime string `json:"scheduledTime"` // HH:MM
	Color         string `json:"color"`         // Hex code
	IsHoliday     bool   `json:"isHoliday"`     // Marks the date as Day Off
}
