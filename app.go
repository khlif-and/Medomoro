package main

import (
	"context"
	"fmt"
	"path/filepath"

	"wails-app/internal/controller"
	"wails-app/internal/domain/repositories"
	"wails-app/internal/repository"

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
func NewApp(appDataDir string) *App {
	// Initialize repositories with AppDataDir
	journalRepo := repositories.NewJournalRepository(appDataDir)
	pomodoroRepo := repositories.NewPomodoroRepository(appDataDir)

	taskRepo := repository.NewTaskRepository(filepath.Join(appDataDir, "tasks.json"))
	memoRepo := repository.NewMemoRepository(filepath.Join(appDataDir, "memos.json"))
	flashcardRepo := repository.NewFlashcardRepository(filepath.Join(appDataDir, "flashcards.json"))
	resourceRepo := repository.NewResourceRepository(filepath.Join(appDataDir, "resources.json"))
	muslimRepo := repository.NewMuslimRepository(filepath.Join(appDataDir, "ibadah.json"))
	nofapRepo := repository.NewNoFapRepository(filepath.Join(appDataDir, "nofap.json"))

	return &App{
		taskController:      controller.NewTaskController(taskRepo),
		journalController:   controller.NewJournalController(journalRepo),
		pomodoroController:  controller.NewPomodoroController(pomodoroRepo),
		muslimController:    controller.NewMuslimController(muslimRepo),
		flashcardController: controller.NewFlashcardController(flashcardRepo),
		noFapController:     controller.NewNoFapController(nofapRepo),
		resourceController:  controller.NewResourceController(resourceRepo),
		memoController:      controller.NewMemoController(memoRepo),
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
