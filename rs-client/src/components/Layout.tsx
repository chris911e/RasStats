import { Outlet } from "react-router"
import Header from "./Header"

export default function Layout() {
    return(
        <div>
            <Header />
            <div className="mt-16">
                <Outlet />
            </div>
        </div>
    )
}