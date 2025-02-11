package collector

import(
	"github.com/shirou/gopsutil/v4/sensors"
	"rasstats/websocket/sys/structs"
)

func SensorTemperature() ([]structs.Sensor, error) {
	s, err := sensors.SensorsTemperatures()
	if err != nil {
		return []structs.Sensor{}, err
	}

	var sSensors []structs.Sensor

	for _, sensor := range s {
		sSensor := structs.Sensor{
			SensorKey: sensor.SensorKey,
			Temperature: sensor.Temperature,
			High: sensor.High,
			Critical: sensor.Critical,
		}

		sSensors = append(sSensors, sSensor)
	}

	return sSensors, nil
}