import { Link, Outlet } from "react-router-dom"
import { Dashboard, Logout, MenuBook, MenuOpen, MenuOutlined, Money, Sell } from "@mui/icons-material"
import { useState } from "react"
import { Menu } from "@mui/material"


function Alayout() {
    const [isOpened, setIsOpened] = useState(false)
    return (
        <div >
            <header className='sticky top-0 w-full bg-white flexBetween py-3 px-6 lg:px-28 z-50 shadow-sm'>
                <span className="md:hidden cursor-pointer" onClick={() => { setIsOpened(!isOpened) }}
                ><MenuOutlined/></span>
                <Link to='/'>
                    <h1 className='text-3xl font-bold'>
                        BOB'S STORE
                    </h1>
                </Link>
                <Link to='/' onClick={() => {
                    localStorage.clear()
                }}>
                    <div className='flexCenter gap-2'>
                        <Logout />
                        <span className="hidden lg:inline">Logout</span>
                    </div>
                </Link>
            </header>
            <main className="flex">

                <aside className="hidden md:inline md:fixed top-15 left-0 h-full w-[260px] bg-white py-16 z-10">
                    <h2 className="text-center mb-16">Hello Mr,
                        <span className="ml-2 font-medium text-xl">Jonas</span></h2>
                    <ul className="">
                        <Link to="/admin/dash">
                            <li className="place-content-center flex py-3 gap-2 hover:bg-[#f5f5f5]">
                                <Dashboard />
                                Dashboard</li></Link>
                        <Link to="/admin/orders">
                            <li className="place-content-center flex py-3 border-t-[1px] gap-2 hover:bg-[#f5f5f5]">
                                <Money />
                                Orders</li></Link>
                        <Link to="/admin/products">
                            <li className="place-content-center flex py-3 border-t-[1px] gap-2 hover:bg-[#f5f5f5]">
                                <Sell />
                                Products</li></Link>
                        {/* 
                        <Link to="/admin/settings">
                            <li className="place-content-center flex py-3 border-t-[1px] gap-2 hover:bg-[#f5f5f5]">
                                <AdminPanelSettings />
                                Admins</li></Link> */}

                    </ul>
                </aside>
                {isOpened && <nav className="fixed w-3/4 left-0 top-15 bg-white py-8 h-full z-10">
                    <h2 className="text-center mb-16">Hello Mr,
                        <span className="ml-2 font-medium text-xl">Jonas</span></h2>
                    <ul className="">
                        <Link to="/admin/dash">
                            <li className="place-content-center flex py-3 gap-2 hover:bg-[#f5f5f5]">
                                <Dashboard />
                                Dashboard</li></Link>
                        <Link to="/admin/orders">
                            <li className="place-content-center flex py-3 border-t-[1px] gap-2 hover:bg-[#f5f5f5]">
                                <Money />
                                Orders</li></Link>
                        <Link to="/admin/products">
                            <li className="place-content-center flex py-3 border-t-[1px] gap-2 hover:bg-[#f5f5f5]">
                                <Sell />
                                Products</li></Link>

                    </ul>
                </nav>}
                <div className="md:ml-[260px] flex-1 ">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}

export default Alayout
