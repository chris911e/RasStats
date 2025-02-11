# RasStats - Monitor your Raspberry PI

Little project made for my RaspberryPi at home.

## Current supported Statistics
These are just chosen stats from structs of gopsutil to fit my own needs.

If you need to adjust this, refer to the official docs of gopsutil to see all available stats and change as needed.


```go
type General struct {
	Hostname	string		`json:"hostname"`
	Uptime		uint64		`json:"uptime"`
	BootTime	uint64		`json:"bootTime"`
	Procs		uint64		`json:"procs"`	
	KernelArch	string		`json:"kernelArch"`
}
```
```go
type Disk struct {
	Path		string		`json:"path"`
	Fstype		string		`json:"fstype"`
	Total		uint64		`json:"total"`
	Free		uint64		`json:"free"`
	Used		uint64		`json:"used"`
	UsedPercent	float64		`json:"usedPercent"`
}
```
```go
type CPU struct {
	CPU         	int32       	`json:"cpu"`
	Family		string		`json:"family"`
	Model		string		`json:"model"`
	CacheSize	int32		`json:"cacheSize"`
}
```
```go
type Memory struct {
	Total		uint64		`json:"total"`
	Available	uint64		`json:"available"`
	Used		uint64		`json:"used"`
	UsedPercent	float64		`json:"usedPercent"`
	Free		uint64		`json:"free"`
}
```
```go
type Sensor struct {
	SensorKey	string		`json:"sensorKey"`
	Temperature	float64		`json:"temperature"`
	High		float64		`json:"sensorHigh"`
	Critical	float64		`json:"sensorCritical"`
}
```

> **NOTE:** as of now, when changing the struct under ``structs/data.go``, it does <u>**NOT**</u> dynamically change the return websocket data.
