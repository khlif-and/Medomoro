package controller

import (
	"context"
	"time"
	"wails-app/internal/model"
	"wails-app/internal/repository"

	"github.com/google/uuid"
)

type TaskController struct {
	ctx  context.Context
	repo *repository.TaskRepository
}

func NewTaskController() *TaskController {
	return &TaskController{
		repo: repository.NewTaskRepository("tasks.json"),
	}
}

func (c *TaskController) Startup(ctx context.Context) {
	c.ctx = ctx
}

func (c *TaskController) GetTasks() ([]model.Task, error) {
	return c.repo.Load()
}

func (c *TaskController) AddTask(title, content, date, timeStr, color string) (model.Task, error) {
	tasks, err := c.repo.Load()
	if err != nil {
		return model.Task{}, err
	}

	newTask := model.Task{
		ID:            uuid.New().String(),
		Title:         title,
		Content:       content,
		IsDone:        false,
		CreatedAt:     time.Now().Format("2006-01-02 15:04:05"),
		ScheduledDate: date,
		ScheduledTime: timeStr,
		Color:         color,
		IsHoliday:     false,
	}

	tasks = append([]model.Task{newTask}, tasks...) // Prepend
	if err := c.repo.Save(tasks); err != nil {
		return model.Task{}, err
	}

	return newTask, nil
}

func (c *TaskController) UpdateTask(updatedTask model.Task) (bool, error) {
	tasks, err := c.repo.Load()
	if err != nil {
		return false, err
	}

	for i, task := range tasks {
		if task.ID == updatedTask.ID {
			tasks[i] = updatedTask
			if err := c.repo.Save(tasks); err != nil {
				return false, err
			}
			return true, nil
		}
	}
	return false, nil
}

func (c *TaskController) DeleteTask(id string) (bool, error) {
	tasks, err := c.repo.Load()
	if err != nil {
		return false, err
	}

	for i, task := range tasks {
		if task.ID == id {
			tasks = append(tasks[:i], tasks[i+1:]...)
			if err := c.repo.Save(tasks); err != nil {
				return false, err
			}
			return true, nil
		}
	}
	return false, nil
}

// ToggleHoliday checks if a special Holiday task exists for the date.
// If yes, removes it. If no, creates it.
func (c *TaskController) ToggleHoliday(date string) (bool, error) {
	tasks, err := c.repo.Load()
	if err != nil {
		return false, err
	}

	// Check if exists
	for i, t := range tasks {
		if t.ScheduledDate == date && t.IsHoliday {
			// Remove it (Toggle Off)
			tasks = append(tasks[:i], tasks[i+1:]...)
			return c.repo.Save(tasks) == nil, c.repo.Save(tasks)
		}
	}

	// Create it (Toggle On)
	holidayTask := model.Task{
		ID:            uuid.New().String(),
		Title:         "Day Off",
		Content:       "Holiday",
		IsDone:        true, // Considered 'done' automatically? Or irrelevant.
		CreatedAt:     time.Now().Format("2006-01-02 15:04:05"),
		ScheduledDate: date,
		IsHoliday:     true,
		Color:         "#3b82f6", // Blue
	}
	tasks = append(tasks, holidayTask)
	err = c.repo.Save(tasks)
	return true, err
}
