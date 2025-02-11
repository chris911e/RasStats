package collector

import(
	"github.com/shirou/gopsutil/v4/cpu"
	"rasstats/websocket/sys/structs"
	"fmt"
)

func SingleCPUInfo() (structs.CPU, error) {
	c, err := cpu.Info()
	if err != nil {
		fmt.Println("Failed fetching CPU Info:", err)
		return structs.CPU{}, err
	}

	cCPU := structs.CPU{
		CPU: c[0].CPU,
		Family: c[0].Family,
		Model: c[0].Model,
		CacheSize: c[0].CacheSize,
	}

	return cCPU, nil
}

func MultiCPUInfo() ([]structs.CPU, error) {
	c, err := cpu.Info()
	if err != nil {
		fmt.Println("Failed fetching CPU Info:", err)
		return nil, err
	}

	var cCPUs []structs.CPU

	for _, cpu := range c {
		cCPU := structs.CPU{
			CPU: cpu.CPU,
			Family: cpu.Family,
			Model: cpu.Family,
			CacheSize: cpu.CacheSize,
		}

		cCPUs = append(cCPUs, cCPU)
	}

	return cCPUs, nil
}