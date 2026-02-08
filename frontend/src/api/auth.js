import api from "./axios"

const loginApi = (data) => {

    return api.post("/auth/login", data)
}

const signupApi = (data) => {

    return api.post("/auth/signup", data)
}

const acceptInviteApi = (data) => {

    return api.post("/clients-invite/accept-invite", data)
}

export default {loginApi, signupApi, acceptInviteApi}