import React, { useEffect, useState } from 'react'
import fetchDashboard from '../api/dashboard'

const Dashboard = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const load = async () => {
      try{

        const res = await fetchDashboard()
        setData(res.data)

      } catch (err){

        console.error("Dashboard fetch failed")

      } finally {

        setLoading(false)

      }
    }

    load()

  }, [])

  if(loading){
    return <p>Loading dashboard...</p>
  }

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Dashboard</h1>

      <div className="grid grid-cols-2 gap-4">

        <Stat label="Total Projects" value={data.dashboardStats.totalProjects}/>
        <Stat label="Active Projects" value={data.dashboardStats.activeProjects}/>
        <Stat label="Team Members" value={data.dashboardStats.totalUsers}/>
        <Stat label="Clients" value={data.dashboardStats.totalClients}/>

      </div>
    </div>
  )
}

function Stat({ label, value}){

  return(
    <div className='p-4 rounded shadow'>
      <p className='text-gray-500'>{label}</p>
      <p className='text-2xl font-bold'>{value}</p>
    </div>
  )
}

export default Dashboard