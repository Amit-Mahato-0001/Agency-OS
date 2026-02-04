import { useAuth } from "../context/AuthContext"
import Dashboard from "../pages/Dashboard"
import ClientDashboard from "../pages/ClientDashboard"

const DashboardRouter = () => {

    const { user } = useAuth()

    if(user?.role == "client"){

        return <ClientDashboard/>
    }

    return <Dashboard/>

}

export default DashboardRouter