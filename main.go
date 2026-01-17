package main

import (
	"context"
	"embed"
	"os"
	"path/filepath"
	"wails-app/internal/controller"
	"wails-app/internal/domain/repositories"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	// Create an instance of the app structure
	app := NewApp()

	// Get App Data Dir
	configDir, _ := os.UserConfigDir()
	appDataDir := filepath.Join(configDir, "wails-app")

	// Repositories
	pomodoroRepo := repositories.NewPomodoroRepository(appDataDir)
	journalRepo := repositories.NewJournalRepository(appDataDir)

	// Controllers
	taskController := controller.NewTaskController()
	memoController := controller.NewMemoController()
	flashcardController := controller.NewFlashcardController()
	resourceController := controller.NewResourceController()
	pomodoroController := controller.NewPomodoroController(pomodoroRepo)
	journalController := controller.NewJournalController(journalRepo)

	muslimController := controller.NewMuslimController()
	nofapController := controller.NewNoFapController()

	// Create application with options
	err := wails.Run(&options.App{
		Title:            "crextio",
		WindowStartState: options.Maximised,
		Frameless:        true,
		Width:            1024,
		Height:           768,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
		OnStartup: func(ctx context.Context) {
			app.startup(ctx)
			taskController.Startup(ctx)
			memoController.Startup(ctx)
			flashcardController.Startup(ctx)
			resourceController.Startup(ctx)
			pomodoroController.Startup(ctx)
			journalController.Startup(ctx)
			muslimController.Startup(ctx)
			nofapController.Startup(ctx)
		},
		Bind: []interface{}{
			app,
			app.taskController,
			app.journalController,
			app.pomodoroController,
			app.muslimController,
			app.flashcardController,
			app.noFapController,
			app.resourceController,
			app.memoController,
			app.systemController,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
