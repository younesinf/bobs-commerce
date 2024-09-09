import { Outlet } from "react-router-dom"
import Header from "../components/Header.jsx"
import Footer from "../components/Footer.jsx"
import Announcement from "../components/Announcement.jsx"
import Newsletter from "../components/Newsletter.jsx"

function Layout() {
    return (
        < >
            <Announcement />
            <Header />
            <main >
                <Outlet />
            </main>
{/*             <Newsletter />
 */}            <Footer />
        </>
    )
}

export default Layout
