package collector

import(
	"github.com/shirou/gopsutil/v4/host"
	"rasstats/websocket/sys/structs"
	"fmt"
)

func HostInfo() (structs.General, error) {
	h, err := host.Info()
	if err != nil {
		fmt.Println("Failed fetching Host Info:", err)
		return structs.General{}, err
	}
	
	hGeneral := structs.General{
		Hostname: h.Hostname,
		Uptime: h.Uptime,
		BootTime: h.BootTime,
		Procs: h.Procs,
		KernelArch: h.KernelArch,
	}

	return hGeneral, nil
}