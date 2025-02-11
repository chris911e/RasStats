package collector

import(
	"github.com/shirou/gopsutil/v4/mem"
	"rasstats/websocket/sys/structs"
)

func MEMInfo() (structs.Memory, error) {
	m, err := mem.VirtualMemory()
	if err != nil {
		return structs.Memory{}, err
	}

	mMemory := structs.Memory{
		Total: m.Total,
		Available: m.Available,
		Used: m.Used,
		UsedPercent: m.UsedPercent,
		Free: m.Free,
	}

	return mMemory, nil
}