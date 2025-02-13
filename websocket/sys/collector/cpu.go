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
		VendorID: c[0].VendorID,
		Family: c[0].Family,
		ModelName: c[0].ModelName,
		CacheSize: c[0].CacheSize,
		Mhz: c[0].Mhz,
	}

	return cCPU, nil
}

func MultiCPUInfo() ([]structs.CPUs, error) {
	c, err := cpu.Info()
	if err != nil {
		fmt.Println("Failed fetching CPU Info:", err)
		return nil, err
	}

	var cCPUs []structs.CPUs

	for _, cpu := range c {
		cCPU := structs.CPUs{
			CPUCount: cpu.CPU,
			Family: cpu.Family,
			Model: cpu.Family,
			CacheSize: cpu.CacheSize,
		}

		cCPUs = append(cCPUs, cCPU)
	}

	return cCPUs, nil
}