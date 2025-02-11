import './App.css'
import { useState, useEffect } from 'react'

function App() {
  const [stats, setStats] = useState([])

  return (
    <div>
      {
        stats.length == 0 ? (
          <div className="flex justify-center items-center h-screen text-3xl text-gray-200 font-bold">
            <img src="/loading.svg" alt="Data Loading" height={50} width={50} />
          </div>
        ) : (
          <div>
            f
          </div>
        )
      }
    </div>
  )
}

export default App
