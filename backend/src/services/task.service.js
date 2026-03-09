const { mongoose } = require('mongoose')
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

module.exports = createTask