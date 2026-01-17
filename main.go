package main

import (
	"context"
	"embed"
	"wails-app/internal/controller"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	// Create an instance of the app structure
	app := NewApp()
	taskController := controller.NewTaskController()
	memoController := controller.NewMemoController()
	flashcardController := controller.NewFlashcardController()
	resourceController := controller.NewResourceController()

	// Create application with options
	err := wails.Run(&options.App{
		Title:            "wails-app",
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
		},
		Bind: []interface{}{
			app,
			taskController,
			memoController,
			flashcardController,
			resourceController,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
