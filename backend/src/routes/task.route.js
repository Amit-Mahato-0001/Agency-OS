const express = require("express")
const requireRole = require("../middleware/rbac.middleware")
const auditLogger = require("../middleware/audit.middleware")
const { createTaskHandler, getTasksHandler} = require("../controllers/task.controller")

const router = express.Router()

router.post('/',
    requireRole(["owner", "admin"]),
    auditLogger("TASK_CREATED"),
    createTaskHandler
)

router.get('/',
    requireRole(["owner", "admin", "member"]),
    getTasksHandler
)

module.exports = router