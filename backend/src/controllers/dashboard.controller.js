const dashboard = require('../services/dashboard.service')

const dashboardHandler = async (req, res) => {

    try {
        
        const dashboardStats = await dashboard(req.tenantId)

        res.json({
            tenantId: req.tenantId,
            dashboardStats
        })

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

module.exports = dashboardHandler