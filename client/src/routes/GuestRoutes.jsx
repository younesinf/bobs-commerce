
import { Navigate, Outlet } from 'react-router-dom'

function GuestRoutes() {
    const admin = localStorage.getItem("admin")
    return (
        !admin ? <Outlet /> : <Navigate to="/admin/dash" />
    )
}

export default GuestRoutes