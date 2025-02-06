package sys

import(
	"rasstats/websocket/sys/collector"
	"fmt"
)

func FetchSystemStats(stats *RPInfo) {
	var sysInfo = collector.SysInfoT()

	fmt.Println(sysInfo[0])
}
