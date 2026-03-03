import { useEffect, useState } from "react"
import { fetchMembers } from "../api/members"

const Members = () => {

    const [members, setMembers] = useState([])

    useEffect(() => {

        loadMembers()

    }, [])

    const loadMembers = async () => {

        try {
            const res = await fetchMembers()
            setMembers(res.data.members) 

        } catch (error) {
            console.error("Failed to load members", error)
        }

    }

    return (

        <div>
            
            <h2>yeee le tere members yeee leee...</h2>

            {members.map((m) => (

                <div key={m.id}>{m.email}</div>
            ))}

        </div>
    )
}

export default Members