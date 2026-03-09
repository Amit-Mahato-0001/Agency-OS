const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema(

    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        assigneeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        status: {
            type: String,
            enum: ["todo", "in-progress", "done"],
            default: "todo"
        },

        priority: {
            type: String,
            enum: ["low", "medium", "high"],
            default: "medium"
        },

        tenantId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tenant",
            required: true
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        deletedAt: {
            type: Date,
            default: null
        }

    },

    {timestamps: true}

)

module.exports = mongoose.model("Task", taskSchema)