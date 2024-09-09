import { Navigate, Outlet } from 'react-router-dom'

function AuthRoutes() {
    const admin = localStorage.getItem("admin")
    return (
        admin ? <Outlet /> : <Navigate to="/admin" />
    )
}

export default AuthRoutes