import {useEffect, useState} from 'react'
import { fetchProjects } from '../api/projects'

const ClientDashboard = () => {

    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        fetchProjects()
        .then(res => setProjects(res.data.projects))
        .finally(() => setLoading(false))

    }, [])

    if(loading) return <p>Loading...</p>

  return (

    <div>
        
        <h1>
            Your projects
        </h1>

        {projects.length === 0 ? (

            <p>
                No projects assigned yet
            </p>

        ) : (

            <div>

                {projects.map(p => (

                    <div
                    key={p._id}>
                        
                        <p>{p.name}</p>
                    </div>
                ))}

            </div>
        )}
    </div>

  )

}

export default ClientDashboard