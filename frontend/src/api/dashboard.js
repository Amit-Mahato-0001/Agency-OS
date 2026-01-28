import api from './axios'

const fetchDashboard = () => {
    return api.get('/dashboard')
}

export default fetchDashboard