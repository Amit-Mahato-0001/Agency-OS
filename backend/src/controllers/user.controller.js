const createUser = require('../services/user.service')

const createUserHandler = async(req, res) => {
  try {
    const userData = {
      email: req.body.email,
      password: req.body.password,
      tenantId: req.user.tenantId
    }

    const user = await createUser(userData)

    return res.status(201).json({
      message: 'User created',
      userId: user._id
    })
  } catch(err) {
    return res.status(400).json({
      message: err.message
    })
  }
}

module.exports = createUserHandler
