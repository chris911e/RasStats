import { useState } from "react"

export default function Header() {
    const [menuModal, setMenuModal] = useState(false)

    return(
        <div className="grid grid-cols-4 bg-gray-200 rounded-lg p-3 items-center fixed w-full z-10 top-0 left-0">
            <div className="flex items-center">
                <img src="/icon.svg" alt="logo" height={40} width={40} />
                <span className="font-bold text-xl ml-1">
                    RasStats
                </span>
            </div>
            <div className="col-span-3 grid-cols-3 hidden sm:grid">
                <div className="text-black/50">
                    Processes
                </div>
                <div className="text-black/50">
                    Network
                </div>
                <div className="text-black/50">
                    Alerting
                </div>
            </div>
            <div className="col-span-3 sm:hidden">
                <div className="text-black/50 flex justify-end">
                    <div className="rounded-lg hover:bg-gray-500/30 cursor-pointer">
                        <img src="/menu.svg" alt="menu" height={32} width={32} />
                    </div>
                </div>
            </div>
        </div>
    )
}