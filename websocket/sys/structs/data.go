package structs

type General struct {
	Hostname	string		`json:"hostname"`
	Uptime		uint64		`json:"uptime"`
	BootTime	uint64		`json:"bootTime"`
	Procs		uint64		`json:"procs"`	
	KernelArch	string		`json:"kernelArch"`
}

type Disk struct {
	Path		string		`json:"path"`
	Fstype		string		`json:"fstype"`
	Total		uint64		`json:"total"`
	Free		uint64		`json:"free"`
	Used		uint64		`json:"used"`
	UsedPercent	float64		`json:"usedPercent"`
}

type CPU struct {
	CPU			int32		`json:"cpu"`
	Family		string		`json:"family"`
	Model		string		`json:"model"`
	CacheSize	int32		`json:"cacheSize"`
}

type RPInfo struct {
	General		General 	`json:"general"`
	Disk		Disk		`json:"disk"`
	CPU			CPU			`json:"cpu"`
}