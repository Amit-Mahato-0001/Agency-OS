const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const User = require('../models/user.model')

const createUser = async (data, options = {}) => {

  const { session } = options

  if (!data.email || !data.password || !data.tenantId) {

    throw new Error('Missing required fields')
    
  }

  if (!mongoose.Types.ObjectId.isValid(data.tenantId)) {

    throw new Error('Invalid tenantId')
  }

  const existingUser = await User.findOne({

    email: data.email,
    tenantId: data.tenantId
    
  }).session(session || null)

  if (existingUser) {

    throw new Error('Email already exists in this tenant')
  }

  const hashedPassword = await bcrypt.hash(data.password, 12)

  const user = new User({
    email: data.email,
    password: hashedPassword,
    tenantId: data.tenantId,
    role: data.role,
    status: 'active'
  })

  await user.save({ session })
  return user
}

module.exports = createUser
