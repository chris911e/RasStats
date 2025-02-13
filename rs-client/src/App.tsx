import './App.css'
import { useState, useEffect } from 'react'
import { useWebSocket } from './components/WebSocketProvider'
import { PieChart, Pie, Cell } from 'recharts'

import RPInfo from './helper/interface'

interface LegendData {
  name: string;
  value: number;
  color: string;
}

function App() {
  const [stats, setStats] = useState<RPInfo | null>(null)
  const ws = useWebSocket()

  useEffect(() => {
    if (!ws) {
      return
    }

    ws.onmessage = (event) => {
      const data: RPInfo = JSON.parse(event.data)
      setStats(data)
    }
  }, [ws])

  const convertTime = (uptime: number): string => {
    const pad = (num: number): string => num.toString().padStart(2, '0')

    const seconds = pad(uptime % 60)
    const minutes = pad(Math.floor((uptime / 60) % 60))
    const hours = pad(Math.floor((uptime / 3600) % 24))
    const days = Math.floor(uptime / 86400).toString()

    return `${days}:${hours}:${minutes}:${seconds}`
  }

  const convertDate = (timestamp: number): string => {
    const bootDate = new Date(timestamp * 1000)
    const day = String(bootDate.getDate()).padStart(2, '0')
    const month = String(bootDate.getMonth() + 1).padStart(2, '0')
    const year = bootDate.getFullYear()
    return `${day}.${month}.${year}`
  }

  const RADIAN = Math.PI / 180;
  const data = [
    { name: 'Good', value: 75, color: '#C5EBCA' },
    { name: 'Warning', value: 20, color: '#FBFFDE' },
    { name: 'Critical', value: 10, color: '#FFAFA3' },
  ];
  const cx = 95;
  const cy = 130;
  const iR = 50;
  const oR = 90;

  const needle = (value: number, data: LegendData[], cx: number, cy: number, iR: number, oR: number, color: string) => {
    let total = 0;
    data.forEach((v) => {
      total += v.value;
    });
    const ang = 180.0 * (1 - value / total);
    const length = (iR + 2 * oR) / 3;
    const sin = Math.sin(-RADIAN * ang);
    const cos = Math.cos(-RADIAN * ang);
    const r = 5;
    const x0 = cx + 5;
    const y0 = cy + 5;
    const xba = x0 + r * sin;
    const yba = y0 - r * cos;
    const xbb = x0 - r * sin;
    const ybb = y0 + r * cos;
    const xp = x0 + length * cos;
    const yp = y0 + length * sin;

    return [
      <circle key="needle-circle" cx={x0} cy={y0} r={r} fill={color} stroke="none" />,
      <path key="needle-path" d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`} stroke="none" fill={color} />,
    ];
  };

  const convertTemp = (temp: number): string => {
    return `${temp.toFixed(1)}°C`
  }

  return (

    <div>
      {
        stats === null ? (
          <div className="flex justify-center items-center h-screen text-3xl text-gray-200 font-bold">
            <img src="/loading.svg" alt="Data Loading" height={50} width={50} />
          </div>
        ) : (
          <div className='pt-4'>
            <div className='p-5 grid grid-cols-3 gap-5'>
              <div className='col-span-3 md:col-span-1 bg-gray-500/20'>
                <div className='text-xl bg-white'>
                  <span className='font-bold'>General</span> <span className='text-sm'>(Raspberry Pi 4)</span>
                </div>
                <div className='grid grid-cols-2 p-5 md:h-full'>
                  <div className='grid grid-rows-5'>
                    <div className='font-bold'>
                      Hostname:
                    </div>
                    <div className='font-bold'>
                      Uptime:
                    </div>
                    <div className='font-bold'>
                      Boot Date:
                    </div>
                    <div className='font-bold'>
                      Processes:
                    </div>
                    <div className='font-bold'>
                      Kernel Arch:
                    </div>
                  </div>
                  <div className='grid grid-rows-5'>
                    <div>
                      {stats.general.hostname}
                    </div>
                    <div>
                      {convertTime(stats.general.uptime)}
                    </div>
                    <div>
                      {convertDate(stats.general.bootTime)}
                    </div>
                    <div>
                      {stats.general.procs}
                    </div>
                    <div>
                      {stats.general.kernelArch}
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-span-3 md:col-span-1 bg-gray-500/20'>
                <div className='text-xl bg-white'>
                  <span className='font-bold'>CPU</span> <span className='text-sm'>({stats.cpu.modelName})</span>
                </div>
                <div className='p-5'>
                  <div className='grid grid-cols-2'>
                    <div>
                      <span className='font-bold'>Mhz:</span> {stats.cpu.mhz}
                    </div>
                    <div>
                      <span className='font-bold'>Vendor:</span> {stats.cpu.vendorId}
                    </div>
                      <div className='col-span-2 flex flex-col items-center'>
                        <PieChart width={200} height={160}>
                          <Pie
                            dataKey="value"
                            startAngle={180}
                            endAngle={0}
                            data={data}
                            cx={cx}
                            cy={cy}
                            innerRadius={iR}
                            outerRadius={oR}
                            fill="#8884d8"
                            stroke="none"
                          >
                            {data.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          {needle(stats.sensor[0].temperature, data, cx, cy, iR, oR, '#d0d000')}
                        </PieChart>
                        <div className='text-xl font-bold'>
                          {convertTemp(stats.sensor[0].temperature)}
                        </div>
                      </div>
                  </div>
                </div>
              </div>
              <div className='col-span-3 md:col-span-1 bg-gray-500/20'>
                <div className='text-xl bg-white'>
                  Other
                </div>
                <div className='p-5'>
                  
                </div>
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default App
