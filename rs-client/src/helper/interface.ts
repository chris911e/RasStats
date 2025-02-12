interface General {
    hostname: string;
    uptime: number;
    bootTime: number;
    porcs: number;
    kernelArch: number;
}

interface Disk {
    path: string;
    fstype: string;
    total: number;
    free: number;
    used: number;
    usedPercent: number;
}

interface CPU {
    cpu: number;
    family: string;
    model: string;
    cacheSize: number;
}

interface Memory {
    total: number;
    available: number;
    used: number;
    usedPercent: number;
}

interface Sensor {
    sensorKey: string;
    temperature: number;
    sensorHigh: number;
    sensorCritical: number;
}

interface RPInfo {
    general: General;
    disk: Disk;
    cpu: CPU;
    memory: Memory;
    sensor: Sensor[];
}

export default RPInfo;