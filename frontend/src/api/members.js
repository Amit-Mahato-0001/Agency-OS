import api from './axios'

export const fetchMembers = () => {
    
    return api.get('/members')
}
