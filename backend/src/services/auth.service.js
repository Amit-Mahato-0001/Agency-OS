//user se agencyname, email, pass lo
//ager inputs invalid h toh error show 
//password length 8 chars hona chahiye
//create tenant 
//create user as owner
//token

const jwt = require('jsonwebtoken')
const createTenant = require('../services/tenant.service')
const createUser = require('../services/user.service')

const signup = async ({agencyName, email, password}) => {
    if(!agencyName || !email || !password){
        throw new Error("All fields required");
        
    }

    if(password.length < 8){
        throw new Error("Password must be of atleast 8 characters");
        
    }

    const tenant = await createTenant({
        name: agencyName
    })

    const user = await createUser({
        email,
        password,
        tenantId: tenant._id,
        role: "owner"
    })

    const token = jwt.sign({
        userId: user._id,
        tenantId: tenant._id,
        role: user.role
    },
    process.env.JWT_SECRET,
    { expiresIn: '1d'}
)

return { token }
}

module.exports = signup