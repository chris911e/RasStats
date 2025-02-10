package collector

import(
	"github.com/shirou/gopsutil/v4/disk"
	"rasstats/websocket/sys/structs"
	"fmt"
)

func DiskInfo(path string) (structs.Disk, error) {
	if path == "" {
		path = "/"
	}

	d, err := disk.Usage(path)
	if err != nil {
		fmt.Println("Failed fetching Disk Info:", err)
		return structs.Disk{}, err
	}

	dDisk := structs.Disk{
		Path: d.Path,
		Fstype: d.Fstype,
		Total: d.Total,
		Free: d.Free,
		Used: d.Used,
		UsedPercent: d.UsedPercent,
	}

	return dDisk, nil
}