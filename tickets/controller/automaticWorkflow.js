const { automaticWorkFlowModel } = require("../model/ticket");
const Joi = require('joi');
const { logError } = require('../utils/logging');

// Function to add records for all issue types and sub-categories if they don't already exist
exports.addRecordsForAllIssueTypes = async () => {
    const records = [
        { issue_type: 'Software', sub_category: 'operating system' },
        { issue_type: 'Software', sub_category: 'application software' },
        { issue_type: 'Software', sub_category: 'custom software' },
        { issue_type: 'Software', sub_category: 'integration issues' },
        { issue_type: 'Hardware', sub_category: 'desktops' },
        { issue_type: 'Hardware', sub_category: 'laptops' },
        { issue_type: 'Hardware', sub_category: 'printers' },
        { issue_type: 'Hardware', sub_category: 'servers' },
        { issue_type: 'Hardware', sub_category: 'networking equipment' },
        { issue_type: 'Network', sub_category: 'email issues' },
        { issue_type: 'Network', sub_category: 'internet connection problems' },
        { issue_type: 'Network', sub_category: 'website errors' }
    ];

    try {
        const existingRecords = await automaticWorkFlowModel.find({ $or: records });

        if (existingRecords.length === 0) {
            const result = await automaticWorkFlowModel.insertMany(records);
            console.log('Records added successfully:', result);
        } else {
            console.log('Records already exist in the database. No new records added.');
        }
    } catch (error) {
        console.error('Error checking or adding records:', error);
    }
}

//user or manager get automatic workflow for a specific issue type and sub_category
exports.getAutomaticWorkFlow = async (req, res) => {
    try {
        const { issue_type, sub_category } = req.query;

        const inputSchema = Joi.object({
            issue_type: Joi.string().regex(/^[a-zA-Z\s]+$/).max(50).required(),
            sub_category: Joi.string().regex(/^[a-zA-Z\s]+$/).max(50).required(),
        });

        const inputData = { issue_type, sub_category }

        const validationResult = inputSchema.validate(inputData);

        if (validationResult.error) {
            logError(req, "400", "GET", "/ticket/getAutomaticWorkFlow", validationResult.error.details[0].message)
            return res.status(400).json({
                status: "fail",
                message: validationResult.error.details[0].message,
            });
        }

        const automaticWorkFlow = await automaticWorkFlowModel.findOne({ issue_type, sub_category });
        if (automaticWorkFlow) {
            return res.status(200).json({
                status: "success",
                data: automaticWorkFlow,
            });
        } else {
            logError(req, "404", "GET", "/ticket/getAutomaticWorkFlow", "Automatic workflow not found for the provided issue_type and sub_category.")
            return res.status(404).json({
                status: "fail",
                message: "Automatic workflow not found for the provided issue_type and sub_category.",
            });
        }
    } catch (err) {
        logError(req, "500", "GET", "/ticket/getAutomaticWorkFlow", err.message)
        return res.status(500).json({
            status: "error",
            message: "Internal server error",
        });
    }
};

//manager updates automatic workflow for a specific issue type and sub_category
exports.updateAutomaticWorkFlow = async (req, res) => {

    if (req.userRole !== "manager") {
        logError(req, "401", "PUT", "/ticket/updateAutomaticWorkFlow", "Unautorized call to Update automatic workflow")
        return res.status(401).json({
            status: "fail",
            message: "Unauthorized",
        });
    }

    try {
        const { issue_type, sub_category, fixes } = req.body;

        const inputSchema = Joi.object({
            issue_type: Joi.string().regex(/^[a-zA-Z\s]+$/).max(50).required(),
            sub_category: Joi.string().regex(/^[a-zA-Z\s]+$/).max(50).required(),
            fixes: Joi.array().items(Joi.string().max(10000)).max(30).required(),
        });

        const inputData = { issue_type, sub_category, fixes }

        const validationResult = inputSchema.validate(inputData);

        if (validationResult.error) {
            logError(req, "400", "PUT", "/ticket/updateAutomaticWorkFlow", validationResult.error.details[0].message)
            return res.status(400).json({
                status: "fail",
                message: validationResult.error.details[0].message,
            });
        }

        const automaticWorkFlow = await automaticWorkFlowModel.findOne({ issue_type, sub_category });

        if (automaticWorkFlow) {
            await automaticWorkFlowModel.updateOne({ issue_type, sub_category }, { $set: { fixes } });
            return res.status(200).json({
                status: "success",
            });
        } else {
            logError(req, "404", "PUT", "/ticket/updateAutomaticWorkFlow", "Automatic workflow not found for the provided issue_type and sub_category.")
            return res.status(404).json({
                status: "fail",
                message: "Automatic workflow not found for the provided issue_type and sub_category.",
            });
        }
    } catch (err) {
        logError(req, "500", "PUT", "/ticket/updateAutomaticWorkFlow", err.message)
        return res.status(500).json({
            status: "error",
            message: "Internal server error",
        });
    }
};
