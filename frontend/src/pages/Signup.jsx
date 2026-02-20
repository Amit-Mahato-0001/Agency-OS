import { useState } from 'react'
import authApi from '../api/auth'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { FaGithub, FaGoogle } from "react-icons/fa";

const Signup = () => {

  const { login } = useAuth()
  const navigate = useNavigate()

  const [agencyName, setAgencyName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {

      const res = await authApi.signupApi({
        agencyName,
        email,
        password
      })

      login(res.data.token)
      navigate('/')

    } catch (error) {
      setError("Signup failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md">

      <p className="text-xs font-semibold text-blue-500 tracking-wide mb-2">
        AGENCY OS
      </p>

      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Create your ManageInSync account
      </h1>

      <p className="text-gray-500 text-sm mb-8">
        Set up your agency workspace and get started instantly.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        <input
          className="w-full rounded-lg border border-gray-300 px-4 py-3 hover:outline-none hover:ring-2 hover:ring-blue-500"
          placeholder="Agency Name"
          value={agencyName}
          onChange={(e) => setAgencyName(e.target.value)}
        />

        <input
          className="w-full rounded-lg border border-gray-300 px-4 py-3 hover:outline-none hover:ring-2 hover:ring-blue-500"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 hover:outline-none hover:ring-2 hover:ring-blue-500"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex items-center justify-between pt-2">
          <button
            disabled={loading}
            className="px-14 py-2 rounded-full bg-blue-500 hover:bg-blue-700 text-white font-medium disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </div>

        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="text-sm text-gray-400">or</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            className="group flex items-center justify-center gap-2 flex-1 py-2 rounded-full border border-gray-200 bg-white hover:bg-blue-500 transition"
          >
            <FaGithub className='text-2xl text-gray-400 group-hover:text-white transition-colors duration-200'/>
          </button>

          <button
            type="button"
            className="group flex items-center justify-center gap-2 flex-1 py-2 rounded-full border border-gray-200 bg-white hover:bg-blue-500 transition"
          >
            <FaGoogle className='text-2xl text-gray-400 group-hover:text-white transition-colors duration-200'/>
          </button>
        </div>

      </form>

      <p className="text-sm text-gray-400 mt-8 text-center">
        Already have an account?{" "}
        <a href="/login" className="text-blue-500 font-medium hover:underline">
          Login
        </a>
      </p>

    </div>
  )
}

export default Signup