//total projects
//active projects
//total users
//total clients

const Project = require('../models/project.model')
const User = require('../models/user.model')

const dashboard = async (tenantId) => {

    if(!tenantId){
        throw new Error("tenantId required")
    }

    const totalProjects = await Project.countDocuments({
        tenantId
    })

    const activeProjects = await Project.countDocuments({
        tenantId, deleteAt: null
    })

    const totalUsers = await User.countDocuments({
        tenantId, role: { $ne: "client"}
    })

    const totalClients = await User.countDocuments({
        tenantId, role: "client"
    })

    return{
        totalProjects,
        activeProjects,
        totalUsers,
        totalClients
    }
}

module.exports = dashboard