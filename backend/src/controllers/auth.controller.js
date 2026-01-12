//input se agencyName, email, password lo
//ager input missing he toh error show
// signup krne bolo signup service ko
//success response
//error

const signup = require('../services/auth.service')

const signupHandler = async (req, res) => {

    try {
        const {agencyName, email, password} = req.body

        if(!agencyName || !email || !password){
            return res.status(400).json({
                message: "Please fill all required fields"
            })
        }

        const result = await signup({ agencyName, email, password})

        return res.status(201).json({
            message: "Signup successful",
            token: result.token
        })

    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}

module.exports = signupHandler