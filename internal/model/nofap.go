package model

type NoFapEntry struct {
	Date      string `json:"date"`      // YYYY-MM-DD
	Status    string `json:"status"`    // "clean", "relapse", "urge"
	UrgeLevel int    `json:"urgeLevel"` // 1-10
	Notes     string `json:"notes"`     // Daily reflection or relapse reason
}

type NoFapStats struct {
	CurrentStreak int `json:"currentStreak"`
	LongestStreak int `json:"longestStreak"`
	TotalClean    int `json:"totalClean"`
	TotalRelapse  int `json:"totalRelapse"`
}
