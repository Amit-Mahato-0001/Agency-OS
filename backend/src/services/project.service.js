const mongoose = require('mongoose')
const Project = require('../models/project.model')
const User = require('../models/user.model')

//CREATE PROJECT 

const createProject = async (data) => {

    const {name, tenantId} = data

    if(!name || !tenantId){
        throw new Error("Project name & tenantId required")
    }

    if(!mongoose.Types.ObjectId.isValid(tenantId)){
        throw new Error("Invalid tenantId")
    }

    return Project.create({
        ...data,
        name: name.trim()
    })
}

//GET PROJECT

const getProject = async (tenantId) => {

    if(!tenantId){
        throw new Error("TenantId required")
    }

    if(!mongoose.Types.ObjectId.isValid(tenantId)){
        throw new Error("Invalid tenantId")
    }

    return Project.find({
        tenantId,
        deletedAt: null
    }).lean()//data fetch speed ke lia
}

//DELETE PROJECT

const deleteProject = async (projectId, tenantId) => {

    if(!projectId || !tenantId){
        throw new Error("ProjectId and tenantId required")
    }

    if(!mongoose.Types.ObjectId.isValid(projectId)){
        throw new Error("Invalid projectId")
    }

    const project = await Project.findOneAndUpdate(
        { _id: projectId, tenantId, deletedAt: null}, //filter (kya dhundna he)
        { deletedAt: new Date()}, //update (kya change krna h)
        { new: true} //option (update ke baad wala project return)
    )

    if(!project){
        throw new Error("Project not found")
    }

    return project
}

//ASSIGN CLIENT TO PROJECT

//projectId url se, clientId body se, tenantId middleware se 
//check kro teeno he ya nhi 
//projectId, clientId check kro valid ya nhi
//project check kro same tenant ka he ki nhi
//client check
//client assign 

const assignClient = async ({projectId, clientIds, tenantId}) => {

    if(!projectId || !clientIds || !tenantId){
        throw new Error("projectId, clientIds & tenantId required")
    }

    if(
        !mongoose.Types.ObjectId.isValid(projectId)
    ){
        throw new Error("Invalid projectId or clientIds");
    }

    const project = await Project.findOne({
        _id: projectId,
        tenantId,
        deletedAt: null
    })

    if(!project){
        throw new Error("Project not found")
    }

    const validClients = await User.find({

        _id: { $in: clientIds },
        tenantId,
        role: "client",
        status: "active"
    })

    if(!validClients.length){
        throw new Error("No valid clients found")
    }

    const validClientIds = validClients.map(c => c._id)

    //using $addToSet to prevent duplicates
    await Project.updateOne(
        { _id: projectId },
        { $addToSet: { clients: { $each: validClientIds }}}
    )
    
    //return updated project
    return await Project.findById(projectId)

}

module.exports = {
    createProject,
    getProject,
    deleteProject,
    assignClient
}
