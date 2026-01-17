package model

type QuranProgress struct {
	SurahName string `json:"surahName"`
	Juz       int    `json:"juz"`
	Ayat      int    `json:"ayat"`
}

type DailyIbadah struct {
	Date string `json:"date"` // YYYY-MM-DD

	// Prayers: 0=Unset, 1=Missed, 2=Late, 3=OnTime
	Subuh   int `json:"subuh"`
	Dzuhur  int `json:"dzuhur"`
	Ashar   int `json:"ashar"`
	Maghrib int `json:"maghrib"`
	Isya    int `json:"isya"`

	// Sunnah
	Tahajud bool `json:"tahajud"`
	Dhuha   bool `json:"dhuha"`
	Rawatib int  `json:"rawatib"` // Number of rakaat

	// Fasting
	Fasting bool `json:"fasting"` // Senin/Kamis

	// Quran
	Quran QuranProgress `json:"quran"`

	TotalPoints int `json:"totalPoints"`
}
