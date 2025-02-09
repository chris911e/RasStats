package sys

type General struct {
	Uptime		int		`json:"uptime"`
	Procs		int		`json:"procs"`
	
}

type RAM struct {
	Totalram	int		`json:"total_ram"`
	Freeram		int		`json:"free_ram"`
}

type Disk struct {
	Type		int		`json:"type"`
	Bsize		int		`json:"block_size"`
	Blocks		int		`json:"blocks"`
	Bfree		int		`json:"free_blocks"`
	Bavail		int		`json:"avail_blocks"`
	Files		int		`json:"files"`
	Ffree		int		`json:"free_files"`
}

type RPInfo struct {
	General		General `json:"general"`
	RAM			RAM		`json:"ram"`
	Disk		Disk	`json:"disk"`
}