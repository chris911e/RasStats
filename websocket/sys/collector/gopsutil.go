package collector

import(
	"github.com/shirou/gopsutil/v4/cpu"
	"fmt"
)

func PsutilSysInfo() ([]cpu.InfoStat, error) {
	c, err := cpu.Info()

	if err != nil {
		fmt.Println("Failed fetching CPU Info:", err)
		return nil, err
	}
	return c, nil
}