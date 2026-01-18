export namespace controller {
	
	export class PomodoroDashboardData {
	    today?: models.PomodoroStat;
	    global?: models.GlobalPomodoroStats;
	    week: models.PomodoroStat[];
	
	    static createFrom(source: any = {}) {
	        return new PomodoroDashboardData(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.today = this.convertValues(source["today"], models.PomodoroStat);
	        this.global = this.convertValues(source["global"], models.GlobalPomodoroStats);
	        this.week = this.convertValues(source["week"], models.PomodoroStat);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class UserProfile {
	    username: string;
	    osUsername: string;
	    role: string;
	    balance: string;
	    avatar: string;
	    avatarUrl: string;
	    osAvatar: string;
	
	    static createFrom(source: any = {}) {
	        return new UserProfile(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.username = source["username"];
	        this.osUsername = source["osUsername"];
	        this.role = source["role"];
	        this.balance = source["balance"];
	        this.avatar = source["avatar"];
	        this.avatarUrl = source["avatarUrl"];
	        this.osAvatar = source["osAvatar"];
	    }
	}

}

export namespace model {
	
	export class QuranProgress {
	    surahName: string;
	    juz: number;
	    ayat: number;
	
	    static createFrom(source: any = {}) {
	        return new QuranProgress(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.surahName = source["surahName"];
	        this.juz = source["juz"];
	        this.ayat = source["ayat"];
	    }
	}
	export class DailyIbadah {
	    date: string;
	    subuh: number;
	    dzuhur: number;
	    ashar: number;
	    maghrib: number;
	    isya: number;
	    tahajud: boolean;
	    dhuha: boolean;
	    rawatib: number;
	    fasting: boolean;
	    quran: QuranProgress;
	    totalPoints: number;
	
	    static createFrom(source: any = {}) {
	        return new DailyIbadah(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.date = source["date"];
	        this.subuh = source["subuh"];
	        this.dzuhur = source["dzuhur"];
	        this.ashar = source["ashar"];
	        this.maghrib = source["maghrib"];
	        this.isya = source["isya"];
	        this.tahajud = source["tahajud"];
	        this.dhuha = source["dhuha"];
	        this.rawatib = source["rawatib"];
	        this.fasting = source["fasting"];
	        this.quran = this.convertValues(source["quran"], QuranProgress);
	        this.totalPoints = source["totalPoints"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class Flashcard {
	    id: string;
	    question: string;
	    answer: string;
	    // Go type: time
	    createdAt: any;
	
	    static createFrom(source: any = {}) {
	        return new Flashcard(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.question = source["question"];
	        this.answer = source["answer"];
	        this.createdAt = this.convertValues(source["createdAt"], null);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class NoFapEntry {
	    date: string;
	    status: string;
	    urgeLevel: number;
	    notes: string;
	
	    static createFrom(source: any = {}) {
	        return new NoFapEntry(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.date = source["date"];
	        this.status = source["status"];
	        this.urgeLevel = source["urgeLevel"];
	        this.notes = source["notes"];
	    }
	}
	export class NoFapStats {
	    currentStreak: number;
	    longestStreak: number;
	    totalClean: number;
	    totalRelapse: number;
	
	    static createFrom(source: any = {}) {
	        return new NoFapStats(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.currentStreak = source["currentStreak"];
	        this.longestStreak = source["longestStreak"];
	        this.totalClean = source["totalClean"];
	        this.totalRelapse = source["totalRelapse"];
	    }
	}
	
	export class ResourceFolder {
	    id: string;
	    name: string;
	    description: string;
	    // Go type: time
	    createdAt: any;
	
	    static createFrom(source: any = {}) {
	        return new ResourceFolder(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.name = source["name"];
	        this.description = source["description"];
	        this.createdAt = this.convertValues(source["createdAt"], null);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class ResourceItem {
	    id: string;
	    folderId: string;
	    type: string;
	    title: string;
	    url: string;
	    description: string;
	    // Go type: time
	    createdAt: any;
	
	    static createFrom(source: any = {}) {
	        return new ResourceItem(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.folderId = source["folderId"];
	        this.type = source["type"];
	        this.title = source["title"];
	        this.url = source["url"];
	        this.description = source["description"];
	        this.createdAt = this.convertValues(source["createdAt"], null);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class StickyNote {
	    id: string;
	    content: string;
	    color: string;
	    // Go type: time
	    createdAt: any;
	
	    static createFrom(source: any = {}) {
	        return new StickyNote(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.content = source["content"];
	        this.color = source["color"];
	        this.createdAt = this.convertValues(source["createdAt"], null);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class Task {
	    id: string;
	    title: string;
	    content: string;
	    isDone: boolean;
	    createdAt: string;
	    scheduledDate: string;
	    scheduledTime: string;
	    color: string;
	    isHoliday: boolean;
	
	    static createFrom(source: any = {}) {
	        return new Task(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.title = source["title"];
	        this.content = source["content"];
	        this.isDone = source["isDone"];
	        this.createdAt = source["createdAt"];
	        this.scheduledDate = source["scheduledDate"];
	        this.scheduledTime = source["scheduledTime"];
	        this.color = source["color"];
	        this.isHoliday = source["isHoliday"];
	    }
	}

}

export namespace models {
	
	export class GlobalPomodoroStats {
	    current_streak: number;
	    last_focus_date: string;
	
	    static createFrom(source: any = {}) {
	        return new GlobalPomodoroStats(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.current_streak = source["current_streak"];
	        this.last_focus_date = source["last_focus_date"];
	    }
	}
	export class JournalEntry {
	    id: string;
	    title: string;
	    content: string;
	    mood: string;
	    // Go type: time
	    created_at: any;
	    // Go type: time
	    updated_at: any;
	
	    static createFrom(source: any = {}) {
	        return new JournalEntry(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.title = source["title"];
	        this.content = source["content"];
	        this.mood = source["mood"];
	        this.created_at = this.convertValues(source["created_at"], null);
	        this.updated_at = this.convertValues(source["updated_at"], null);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class PomodoroStat {
	    id: string;
	    date: string;
	    focus_minutes: number;
	    sessions: number;
	    // Go type: time
	    created_at: any;
	    // Go type: time
	    updated_at: any;
	
	    static createFrom(source: any = {}) {
	        return new PomodoroStat(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.date = source["date"];
	        this.focus_minutes = source["focus_minutes"];
	        this.sessions = source["sessions"];
	        this.created_at = this.convertValues(source["created_at"], null);
	        this.updated_at = this.convertValues(source["updated_at"], null);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}

}

export namespace repository {
	
	export class ResourceData {
	    folders: model.ResourceFolder[];
	    items: model.ResourceItem[];
	
	    static createFrom(source: any = {}) {
	        return new ResourceData(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.folders = this.convertValues(source["folders"], model.ResourceFolder);
	        this.items = this.convertValues(source["items"], model.ResourceItem);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}

}

