import api from "./axios"

const loginApi = (data) => {

    return api.post("/auth/login", data)
}

export default loginApi