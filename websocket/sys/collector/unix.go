package collector

import(
	"golang.org/x/sys/unix"
	"fmt"
	"os"
)

func GeneralSystemInfo() ([]int, error) {

	// Sysinfo_t
	var general unix.Sysinfo_t
	err := unix.Sysinfo(&general)
	if err != nil {
		fmt.Println("Failed fetching Sysinfo_t:", err)
		return nil, err
	}

	return []int{
		int(general.Uptime),
		int(general.Totalram),
		int(general.Freeram),
		int(general.Procs),
	}, nil
}

func DiskInfo() ([]int, error) {
	wd, err := os.Getwd()
	if err != nil {
		fmt.Println("Failed getting wd:", err)
		return nil, err
	}

	// Statfs_t
	var disk unix.Statfs_t
	err = unix.Statfs(wd, &disk)
	if err != nil {
		fmt.Println("Failed fetching Statfs_t:", err)
		return nil, err
	}

	return []int{
		int(disk.Type),
		int(disk.Bsize),
		int(disk.Blocks),
		int(disk.Bfree),
		int(disk.Bavail),
		int(disk.Files),
		int(disk.Ffree),
	}, nil
}