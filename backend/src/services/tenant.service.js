const Tenant = require('../models/tenant.model')

const createTenant = async (data, options = {}) => {

    const { session } = options

    const existingTenant = await Tenant.findOne({ name: data.name }).session(session || null)

    if(existingTenant){

        throw new Error('Tenant already exists')
    }

    const tenant = new Tenant({

        name: data.name
    })

    await tenant.save({ session })
    
    return tenant
}

module.exports = createTenant
