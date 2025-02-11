import { Outlet } from "react-router"

export default function Header() {
    return(
        <div>
            <div className="grid grid-cols-4 bg-gray-200 rounded-lg p-3 items-center fixed w-full z-10">
                <div className="flex items-center">
                    <img src="/icon.svg" alt="logo" height={40} width={40} />
                    <span className="font-bold text-xl ml-1">
                        RasStats
                    </span>
                </div>
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
            <Outlet />
        </div>
    )
}