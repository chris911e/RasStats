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

  useEffect(() => { console.log(stats?.cpu.mhz) }, [stats])

  return (

    <div>
      {
        stats === null ? (
          <div className="flex justify-center items-center h-screen text-3xl text-gray-200 font-bold">
            <img src="/loading.svg" alt="Data Loading" height={50} width={50} />
          </div>
        ) : (
          <div className='p-16'>
            <div id='general' className='bg-gray-200/50 p-5 grid grid-cols-2'>
              <div>
                Memory Usage:
              </div>
              <div>
                {Math.floor(stats.memory.usedPercent*100)/100}%
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default App
