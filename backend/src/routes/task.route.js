const express = require("express")
const requireRole = require("../middleware/rbac.middleware")
const auditLogger = require("../middleware/audit.middleware")
const createTaskHandler = require("../controllers/task.controller")

const router = express.Router()

router.post('/',
    requireRole(["owner", "admin"]),
    auditLogger("TASK_CREATED"),
    createTaskHandler
)

module.exports = router