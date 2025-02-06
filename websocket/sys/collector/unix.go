package collector

import(
	"golang.org/x/sys/unix"
	"fmt"
)

// change num inside of [] to alter num of ints
func SysInfoT() [4]int {
	var info unix.Sysinfo_t

	err := unix.Sysinfo(&info)
	if err != nil {
		fmt.Println("Error:", err)
		return [4]int{0, 0, 0, 0}
	}

	return [4]int{
		int(info.Uptime),
		int(info.Totalram),
		int(info.Freeram),
		int(info.Procs),
	}
}