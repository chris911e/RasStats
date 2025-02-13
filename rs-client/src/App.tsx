import './App.css'
import { useState, useEffect } from 'react'
import { useWebSocket } from './components/WebSocketProvider'

import RPInfo from './helper/interface'

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

  return (

    <div>
      {
        stats === null ? (
          <div className="flex justify-center items-center h-screen text-3xl text-gray-200 font-bold">
            <img src="/loading.svg" alt="Data Loading" height={50} width={50} />
          </div>
        ) : (
          <div className='pt-4'>
            <div id='general' className='p-5 grid grid-cols-3 gap-5'>
              <div className='grid grid-cols-2 bg-gray-500/20 p-5 col-span-3 md:col-span-1'>
                <div>
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
                <div>
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
              <div className='bg-gray-500/20 p-5 col-span-3 md:col-span-2'>
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default App
