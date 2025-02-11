package sys

import (
	"rasstats/websocket/sys/collector"
	"rasstats/websocket/sys/structs"
)

func FetchSystemStats() (structs.RPInfo, error) {

	host, err := collector.HostInfo()
	if err != nil {
		return structs.RPInfo{}, err
	}

	disk, err := collector.DiskInfo("")
	if err != nil {
		return structs.RPInfo{}, err
	}

	cpu, err := collector.SingleCPUInfo()
	if err != nil {
		return structs.RPInfo{}, err
	}

	mem, err := collector.MEMInfo()
	if err != nil {
		return structs.RPInfo{}, err
	}

	sensors, err := collector.SensorTemperature()
	if err != nil {
		return structs.RPInfo{}, err
	}

	rpInfo := structs.RPInfo{
		General: host,
		Disk: disk,
		CPU: cpu,
		Memory: mem,
		Sensor: sensors,
	}

	return rpInfo, nil
}
