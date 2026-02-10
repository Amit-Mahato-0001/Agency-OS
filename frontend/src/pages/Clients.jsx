import { useState, useEffect } from 'react'
import { fetchClients, inviteClient as inviteClientAPI} from '../api/clients'

const Clients = () => {
    
    const [clients, setClients] = useState([])
    const [loading, setLoading] = useState(true)
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")

    useEffect(() => {

        loadClients()
    }, [])

    const loadClients = async () => {

        try {
            
            setLoading(true)
            const res = await fetchClients()
            setClients(res.data.clients)

        } catch (error) {

            console.error("failed to load clients", error)
            setError("failed to load clients")

        } finally{

            setLoading(false)

        }

    }

    const inviteClient = async () => {

        try {
            
            await inviteClientAPI({ email })
            setMessage("Invite sent successfully")
            setError("")
            setEmail("")
            loadClients()

        } catch (error) {

            setError(
                
                error.response?.data?.message || "Failed to send invite"
            )

        } finally{

            setLoading(false)
        }
    }

    const handleSubmit = (e) => {

        e.preventDefault()
        setLoading(true)
        setError("")
        setLoading(true)
        inviteClient()
    }

  return (

    <div>

        <h1 className='text-2xl font-bold mb-4'>Clients</h1>

        {/* INVITE CLIENT */}

        <form 
        onSubmit={handleSubmit}
        className='flex gap-3 mb-6'
        > 

            <input 
            type="email"
            placeholder='client email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='border p-2 rounded w-60'/>

            <button
            disabled={loading}
            className='bg-black text-white px-4 rounded'>

                {loading ? "Inviting..." : "Invite Client"}
            </button>

        </form>

        {
            message && (
                
                <p className='text-green-600 mb-4'>{message}</p>
            )
        }

        {
            error && (

                <p className='text-red-500 mb-4'>{error}</p>
            )
        }

        {/* CLIENT LIST */}
        <div className='space-y-2'>

            {clients.map((c) => (

                <div
                key={c._id}
                className='p-4 rounded shadow flex items-center justify-between'>

                    <span>{c.email}</span>

                    <span className='flex items-center gap-2 text-xs font-medium'>
                        
                        <span

                        className={`h-2 w-2 rounded-full ${
                            c.status === "active"
                            ? "bg-green-500 animate-pulse"
                            : "bg-gray-500"
                        }`}

                        />

                        <span
                        className={`px-2 py-2 rounded ${
                            c.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}>

                            {c.status === "active" ? "Active" : "Inactive"}
                        </span>

                    </span>

                </div>
            ))}

            {clients.length === 0 && (

                <p
                className='text-gray-500'
                >
                    No clients invited yet
                </p>
            )}

        </div>
    </div>

  )
}

export default Clients