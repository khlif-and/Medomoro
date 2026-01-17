package main

import (
	"context"
	"fmt"

	"wails-app/internal/controller"
	"wails-app/internal/domain/repositories"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

// App struct
type App struct {
	ctx                 context.Context
	taskController      *controller.TaskController
	journalController   *controller.JournalController
	pomodoroController  *controller.PomodoroController
	muslimController    *controller.MuslimController
	flashcardController *controller.FlashcardController
	noFapController     *controller.NoFapController
	resourceController  *controller.ResourceController
	memoController      *controller.MemoController
	systemController    *controller.SystemController
}

// NewApp creates a new App application struct
func NewApp() *App {
	// Initialize repositories
	// Using "." as appDataDir for development to keep files in project root
	journalRepo := repositories.NewJournalRepository(".")
	pomodoroRepo := repositories.NewPomodoroRepository(".")

	return &App{
		taskController:      controller.NewTaskController(),
		journalController:   controller.NewJournalController(journalRepo),
		pomodoroController:  controller.NewPomodoroController(pomodoroRepo),
		muslimController:    controller.NewMuslimController(),
		flashcardController: controller.NewFlashcardController(),
		noFapController:     controller.NewNoFapController(),
		resourceController:  controller.NewResourceController(),
		memoController:      controller.NewMemoController(),
		systemController:    controller.NewSystemController(),
	}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
	a.taskController.Startup(ctx)
	a.journalController.Startup(ctx)
	a.pomodoroController.Startup(ctx)
	a.muslimController.Startup(ctx)
	a.flashcardController.Startup(ctx)
	a.noFapController.Startup(ctx)
	a.resourceController.Startup(ctx)
	a.memoController.Startup(ctx)
	a.systemController.Startup(ctx)
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

// SetMiniMode resizes window to small floating timer
func (a *App) SetMiniMode() {
	runtime.WindowUnmaximise(a.ctx)
	runtime.WindowSetSize(a.ctx, 280, 160)
	runtime.WindowSetAlwaysOnTop(a.ctx, true)
	runtime.WindowCenter(a.ctx)
}

// SetFullMode restores window to full size
func (a *App) SetFullMode() {
	runtime.WindowSetAlwaysOnTop(a.ctx, false)
	runtime.WindowMaximise(a.ctx)
}

// MinimizeWindow minimizes the window to taskbar
func (a *App) MinimizeWindow() {
	runtime.WindowMinimise(a.ctx)
}

// CloseWindow closes the application
func (a *App) CloseWindow() {
	runtime.Quit(a.ctx)
}
