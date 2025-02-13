import { useState } from "react"

export default function Header() {
    const [menuModal, setMenuModal] = useState(false)

    const toggleMenu = () => {
        setMenuModal(!menuModal)
    }

    return(
       <div className="select-none">
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
                        <div 
                            className="rounded-full hover:bg-gray-500/30 cursor-pointer p-1"
                            onClick={() => toggleMenu()}
                        >
                            <img src="/menu.svg" alt="menu" height={28} width={28} />
                        </div>
                    </div>
                </div>
            </div>
            <div>
                {
                    menuModal && (
                        <div className="fixed inset-0" onClick={() => setMenuModal(false)}>
                            <div className="fixed top-20 right-3 sm:hidden bg-gray-200 rounded-sm p-3 z-10" onClick={(e) => e.stopPropagation()}>
                                <div
                                    className="
                                        absolute 
                                        -top-2 
                                        right-2 
                                        w-0 
                                        h-0 
                                        border-l-8 
                                        border-l-transparent 
                                        border-r-8 
                                        border-r-transparent 
                                        border-b-8 
                                        border-b-gray-200" 
                                />
                                <div className="flex flex-col gap-3 text-lg w-35">
                                    <div className="grid grid-cols-3 hover:bg-gray-500/30 rounded-lg cursor-pointer p-2">
                                        <div className="">
                                            <img src="/gear.svg" alt="gear" height={25} width={25} />
                                        </div>
                                        <div className="col-span-2">
                                            Processes
                                        </div>
                                    </div>
                                    <div className="bg-black h-px" />
                                    <div className="grid grid-cols-3 hover:bg-gray-500/30 rounded-lg cursor-pointer p-2">
                                        <div>
                                            <img src="/network.svg" alt="gear" height={25} width={25} />
                                        </div>
                                        <div className="col-span-2">
                                            Network
                                        </div>
                                    </div>
                                    <div className="bg-black h-px" />
                                    <div className="grid grid-cols-3 hover:bg-gray-500/30 rounded-lg cursor-pointer p-2">
                                        <div>
                                            <img src="/alerting.svg" alt="gear" height={30} width={30} />
                                        </div>
                                        <div className="col-span-2">
                                            Alerting
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
       </div> 
    )
}