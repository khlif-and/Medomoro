package controller

import (
	"context"
	"encoding/base64"
	"fmt"
	"os"
	"os/user"
	"path/filepath"
	"strings"

	"golang.org/x/sys/windows/registry"
)

type SystemController struct {
	ctx context.Context
}

func NewSystemController() *SystemController {
	return &SystemController{}
}

func (c *SystemController) Startup(ctx context.Context) {
	c.ctx = ctx
}

type UserProfile struct {
	Username  string `json:"username"`
	Avatar    string `json:"avatar"` // Base64 encoded or path
	AvatarUrl string `json:"avatarUrl"`
}

func (c *SystemController) GetUserProfile() (*UserProfile, error) {
	usr, err := user.Current()
	if err != nil {
		return nil, err
	}

	// Clean username (remove domain if present, e.g. DESKTOP\Khalif -> Khalif)
	username := usr.Username
	if idx := strings.LastIndex(username, "\\"); idx != -1 {
		username = username[idx+1:]
	}

	profile := &UserProfile{
		Username: username,
	}

	// Try to find avatar
	avatarPath, err := c.getUserProfilePicturePath(usr.Uid)
	if err == nil && avatarPath != "" {
		// Read file and convert to base64 for easy display in frontend
		data, err := os.ReadFile(avatarPath)
		if err == nil {
			// Basic mime type detection
			mimeType := "image/jpeg"
			if strings.HasSuffix(strings.ToLower(avatarPath), ".png") {
				mimeType = "image/png"
			} else if strings.HasSuffix(strings.ToLower(avatarPath), ".bmp") {
				mimeType = "image/bmp"
			}

			b64 := base64.StdEncoding.EncodeToString(data)
			profile.Avatar = fmt.Sprintf("data:%s;base64,%s", mimeType, b64)
		}
	}

	return profile, nil
}

func (c *SystemController) getUserProfilePicturePath(sid string) (string, error) {
	// Method 1: Registry Lookup for High Res Image
	// Key: HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\AccountPicture\Users\{SID}
	// Values: Image1080, Image448, Image192, etc.

	k, err := registry.OpenKey(registry.LOCAL_MACHINE, `SOFTWARE\Microsoft\Windows\CurrentVersion\AccountPicture\Users\`+sid, registry.QUERY_VALUE)
	if err == nil {
		defer k.Close()

		// Try to get highest resolution first
		imageKeys := []string{"Image1080", "Image448", "Image192", "Image96"}
		for _, key := range imageKeys {
			path, _, err := k.GetStringValue(key)
			if err == nil && path != "" {
				// Verify file exists
				if _, err := os.Stat(path); err == nil {
					return path, nil
				}
			}
		}
	}

	// Method 2: Check Temp folder for %USERNAME%.bmp (Legacy/Cache fallback)
	username := os.Getenv("USERNAME")
	tempDir := os.TempDir()
	bmpPath := filepath.Join(tempDir, username+".bmp")
	if _, err := os.Stat(bmpPath); err == nil {
		return bmpPath, nil
	}

	// Method 3: Public Account Pictures (Generic fallback)
	// Usually at C:\Users\Public\AccountPictures\{SID}
	// But filenames are unique GUIDs, hard to guess without registry.

	return "", fmt.Errorf("avatar not found")
}
