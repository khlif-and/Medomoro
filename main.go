package main

import (
	"context"
	"embed"
	"os"
	"path/filepath"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	// Get App Data Dir
	configDir, err := os.UserConfigDir()
	if err != nil {
		println("Error getting user config dir:", err.Error())
	}
	appDataDir := filepath.Join(configDir, "medomoro")

	// Ensure App Data Dir exists
	if err := os.MkdirAll(appDataDir, 0755); err != nil {
		println("Error creating app data dir:", err.Error())
	}

	// Create an instance of the app structure
	app := NewApp(appDataDir)

	// Create application with options
	err = wails.Run(&options.App{
		Title:            "Medomoro Apps for Productivity",
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
