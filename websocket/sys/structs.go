package sys

type General struct {
	Uptime		int		`json:"uptime"`
	Procs		int		`json:"procs"`
	
}

type RAM struct {
	Totalram	int		`json:"total_ram"`
	Freeram		int		`json:"free_ram"`
	Bufferram	int		`json:"buffer_ram"`
}

type RPInfo struct {
	General		General `json:"general"`
	RAM			RAM		`json:"ram"`
}