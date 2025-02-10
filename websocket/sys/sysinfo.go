package sys

import(
	"rasstats/websocket/sys/collector"
	"fmt"
)

func FetchSystemStats() (RPInfo, error) {

	general, err := collector.GeneralSystemInfo()
	if err != nil {
		return RPInfo{}, err
	}

	disk, err := collector.DiskInfo()
	if err != nil {
		return  RPInfo{}, err
	}

	gopsutil, err := collector.PsutilSysInfo()
	if err != nil {
		return RPInfo{}, err
	}

	fmt.Println(gopsutil)

	var rpInfo RPInfo = RPInfo{
		General: General{
			Uptime: general[0],
			Procs: general[3],
		},
		RAM: RAM{
			Totalram: general[1],
			Freeram: general[2],
		},
		Disk: Disk{
			Type: disk[4],
			Bsize: disk[5],
			Blocks: disk[6],
			Bfree: disk[7],
			Bavail: disk[8],
			Files: disk[9],
			Ffree: disk[10],
		},
	}

	return rpInfo, nil
}
