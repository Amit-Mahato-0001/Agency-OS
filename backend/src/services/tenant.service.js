const Tenant = require('../models/tenant.model')

const createTenant = async (data) => {
    const existingTenant = await Tenant.findOne({ name: data.name})

    if(existingTenant){
        throw new Error('Tenant already exists')
    }

    return Tenant.create({
        name: data.name
    })
}

module.exports = createTenant