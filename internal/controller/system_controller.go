package controller

import (
	"context"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"os"
	"os/user"
	"path/filepath"
	"strings"

	"github.com/wailsapp/wails/v2/pkg/runtime"
	"golang.org/x/sys/windows/registry"
)

type SystemController struct {
	ctx          context.Context
	appDataDir   string
	profileProps *UserProfile
}

func NewSystemController() *SystemController {
	configDir, _ := os.UserConfigDir()
	appDataDir := filepath.Join(configDir, "wails-app")
	return &SystemController{
		appDataDir: appDataDir,
	}
}

func (c *SystemController) Startup(ctx context.Context) {
	c.ctx = ctx
	c.loadCustomProfile()
}

type UserProfile struct {
	Username   string `json:"username"`
	OsUsername string `json:"osUsername"` // Always the system username
	Role       string `json:"role"`
	Balance    string `json:"balance"`
	Avatar     string `json:"avatar"`    // Custom uploaded image (for card background)
	AvatarUrl  string `json:"avatarUrl"` // Path to custom image
	OsAvatar   string `json:"osAvatar"`  // Always the system avatar (for top nav)
}

func (c *SystemController) GetUserProfile() (*UserProfile, error) {
	// Start with OS defaults
	usr, err := user.Current()
	username := "User"
	if err == nil {
		username = usr.Username
		if idx := strings.LastIndex(username, "\\"); idx != -1 {
			username = username[idx+1:]
		}
	}

	profile := &UserProfile{
		Username:   username,
		OsUsername: username,
		Role:       "Premium Member",
		Balance:    "$1,200",
	}

	// 1. Always fetch OS Avatar (for TopNav)
	if usr != nil {
		avatarPath, err := c.getUserProfilePicturePath(usr.Uid)
		if err == nil && avatarPath != "" {
			data, err := os.ReadFile(avatarPath)
			if err == nil {
				profile.OsAvatar = c.toBase64(data, avatarPath)
			}
		}
	}

	// 2. Fetch Custom Avatar (for Card Background)
	// Default to OS Avatar if no custom one exists
	profile.Avatar = profile.OsAvatar

	// Override with saved custom data if available
	if c.profileProps != nil {
		if c.profileProps.Username != "" {
			profile.Username = c.profileProps.Username
		}
		if c.profileProps.Role != "" {
			profile.Role = c.profileProps.Role
		}
		if c.profileProps.Balance != "" {
			profile.Balance = c.profileProps.Balance
		}
		if c.profileProps.AvatarUrl != "" {
			profile.AvatarUrl = c.profileProps.AvatarUrl
		}
	}

	// Load Custom Avatar if separate file exists
	if profile.AvatarUrl != "" {
		if _, err := os.Stat(profile.AvatarUrl); err == nil {
			data, err := os.ReadFile(profile.AvatarUrl)
			if err == nil {
				profile.Avatar = c.toBase64(data, profile.AvatarUrl)
			}
		}
	}

	return profile, nil
}

func (c *SystemController) UpdateUserProfile(username, role, balance string) (*UserProfile, error) {
	if c.profileProps == nil {
		c.profileProps = &UserProfile{}
	}
	c.profileProps.Username = username
	c.profileProps.Role = role
	c.profileProps.Balance = balance

	c.saveCustomProfile()
	return c.GetUserProfile()
}

func (c *SystemController) UpdateAvatar() (*UserProfile, error) {
	selection, err := runtime.OpenFileDialog(c.ctx, runtime.OpenDialogOptions{
		Title: "Select Profile Background",
		Filters: []runtime.FileFilter{
			{DisplayName: "Images", Pattern: "*.png;*.jpg;*.jpeg;*.bmp;*.webp"},
		},
	})

	if err != nil || selection == "" {
		return nil, err
	}

	// Copy to app data dir to ensure persistence
	ext := filepath.Ext(selection)
	destPath := filepath.Join(c.appDataDir, "user_avatar"+ext)

	input, err := os.ReadFile(selection)
	if err != nil {
		return nil, err
	}

	err = os.WriteFile(destPath, input, 0644)
	if err != nil {
		return nil, err
	}

	if c.profileProps == nil {
		c.profileProps = &UserProfile{}
	}
	c.profileProps.AvatarUrl = destPath
	c.saveCustomProfile()

	return c.GetUserProfile()
}

func (c *SystemController) loadCustomProfile() {
	path := filepath.Join(c.appDataDir, "user_profile.json")
	data, err := os.ReadFile(path)
	if err == nil {
		var saved UserProfile
		if err := json.Unmarshal(data, &saved); err == nil {
			c.profileProps = &saved
		}
	}
}

func (c *SystemController) saveCustomProfile() {
	if c.profileProps == nil {
		return
	}
	path := filepath.Join(c.appDataDir, "user_profile.json")
	data, _ := json.MarshalIndent(c.profileProps, "", "  ")
	os.WriteFile(path, data, 0644)
}

func (c *SystemController) toBase64(data []byte, path string) string {
	mimeType := "image/jpeg"
	if strings.HasSuffix(strings.ToLower(path), ".png") {
		mimeType = "image/png"
	} else if strings.HasSuffix(strings.ToLower(path), ".bmp") {
		mimeType = "image/bmp"
	}
	b64 := base64.StdEncoding.EncodeToString(data)
	return fmt.Sprintf("data:%s;base64,%s", mimeType, b64)
}

func (c *SystemController) getUserProfilePicturePath(sid string) (string, error) {
	// Method 1: Registry Lookup for High Res Image
	// Key: HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\AccountPicture\Users\{SID}
	k, err := registry.OpenKey(registry.LOCAL_MACHINE, `SOFTWARE\Microsoft\Windows\CurrentVersion\AccountPicture\Users\`+sid, registry.QUERY_VALUE)
	if err == nil {
		defer k.Close()
		imageKeys := []string{"Image1080", "Image448", "Image192", "Image96"}
		for _, key := range imageKeys {
			path, _, err := k.GetStringValue(key)
			if err == nil && path != "" {
				if _, err := os.Stat(path); err == nil {
					return path, nil
				}
			}
		}
	}

	// Method 2: Check Temp folder for %USERNAME%.bmp
	username := os.Getenv("USERNAME")
	tempDir := os.TempDir()
	bmpPath := filepath.Join(tempDir, username+".bmp")
	if _, err := os.Stat(bmpPath); err == nil {
		return bmpPath, nil
	}

	return "", fmt.Errorf("avatar not found")
}
