const createTask = require("../services/task.service")

const createTaskHandler = async (req, res) => {

    try {
        
        const task = await createTask({

        title: req.body.title,
        assigneeId: req.body.assigneeId,
        tenantId: req.tenantId,
        status: req.body.status,
        priority: req.body.priority,
        createdBy: req.user._id

    })

    return res.status(200).json(
        {
            message: "Task created successfully",
            task
        }
    )

    } catch (error) {

        return res.status(400).json({

            message: error.message
        })
        
    }
}

module.exports = createTaskHandler