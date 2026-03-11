const mongoose = require('mongoose')
const Task = require('../models/task.model')

const createTask = async (data) => {

    const { title, assigneeId, tenantId, status, priority, createdBy } = data

    if(!title || !assigneeId || !tenantId || !status || !priority || !createdBy){

        throw new Error("Title, assigneeId, status, priority or createdBy is invalid")
    }

    if(!mongoose.Types.ObjectId.isValid(tenantId)){

        throw new Error("Invalid tenantId")
    }

    const newTask = await Task.create({

        title,
        assigneeId,
        tenantId,
        status,
        priority,
        createdBy
    })

    return newTask
}

const getTasks = async ({tenantId, assigneeId, user}) => {

    if(!tenantId){
        
        throw new Error("TenantId required")
    }

    if(!mongoose.Types.ObjectId.isValid(tenantId)){

        throw new Error("Invalid tenantId")
    }

    const query = {

        tenantId,
        deletedAt : null
    }

    //role filtering

    if(user.role === "member"){

        query.assigneeId = new mongoose.Types.ObjectId(user._id)
    }

    if(assigneeId){

        query.assigneeId = new mongoose.Types.ObjectId(assigneeId)
    }

    const tasks = await Task.find(query).lean()

    return tasks
}

module.exports = {createTask, getTasks}