package sys

import(
	"rasstats/websocket/sys/collector"
	"fmt"
)

func FetchSystemStats() (RPInfo, error) {

	unix, err := collector.SysInfoUnix()
	if err != nil {
		return RPInfo{}, err
	}

	gopsutil, err := collector.PsutilSysInfo()
	if err != nil {
		return RPInfo{}, err
	}

	fmt.Println(gopsutil)

	var rpInfo RPInfo = RPInfo{
		General: General{
			Uptime: unix[0],
			Procs: unix[3],
		},
		RAM: RAM{
			Totalram: unix[1],
			Freeram: unix[2],
		},
		Disk: Disk{
			Type: unix[4],
			Bsize: unix[5],
			Blocks: unix[6],
			Bfree: unix[7],
			Bavail: unix[8],
			Files: unix[9],
			Ffree: unix[10],
		},
	}

	return rpInfo, nil
}
