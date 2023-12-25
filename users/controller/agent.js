const { userModel } = require('../model/user');
const Joi = require('joi');
const { logError } = require('../utils/logging');

const issues = [
    { issue_type: "Software", sub_category: "operating system" },
    { issue_type: "Software", sub_category: "application software" },
    { issue_type: "Software", sub_category: "custom software" },
    { issue_type: "Software", sub_category: "integration issues" },
    { issue_type: "Hardware", sub_category: "desktops" },
    { issue_type: "Hardware", sub_category: "laptops" },
    { issue_type: "Hardware", sub_category: "printers" },
    { issue_type: "Hardware", sub_category: "servers" },
    { issue_type: "Hardware", sub_category: "networking equipment" },
    { issue_type: "Network", sub_category: "email issues" },
    { issue_type: "Network", sub_category: "internet connection problems" },
    { issue_type: "Network", sub_category: "website errors" }
];


//agent get his workflows
exports.getCustomWorkflow = async (req, res) => {

    if (req.userRole !== "agent1" && req.userRole !== "agent2" && req.userRole !== "agent3") {
        logError(req, "401", "GET", "/user/getCustomWorkflow", "Unauthorized call to get custom workflow");
        return res.status(401).json({
            status: "fail",
            message: "Unauthorized",
        });
    }

    try {
        const id = req.userId;

        const { issue_type, sub_category } = req.query;

        const inputSchema = Joi.object({
            issue_type: Joi.string().regex(/^[a-zA-Z\s]+$/).max(50).required(),
            sub_category: Joi.string().regex(/^[a-zA-Z\s]+$/).max(50).required(),
        });

        const inputData = { issue_type, sub_category }

        const validationResult = inputSchema.validate(inputData);

        if (validationResult.error) {
            logError(req, "400", "GET", "/user/getCustomWorkflow", validationResult.error.details[0].message)
            return res.status(400).json({
                status: "fail",
                message: validationResult.error.details[0].message,
            });
        }

        const matchingIssue = issues.find(
            (issue) => issue.issue_type === issue_type && issue.sub_category === sub_category
        );

        if (!matchingIssue) {
            logError(req, "404", "GET", "/user/getCustomWorkflow", "Custom workflow not found for the provided issue_type and sub_category.");
            return res.status(404).json({
                status: "fail",
                message: "Custom workflow not found for the provided issue_type and sub_category.",
            });
        }

        const user = await userModel.findOne({ _id: id });

        var fixes = [];
        for (var i = 0; i < user.custom_workflow.length; i++) {
            if (user.custom_workflow[i].issue_type == issue_type && user.custom_workflow[i].sub_category == sub_category) {
                fixes = user.custom_workflow[i].fixes;
                break;
            }
        }

        return res.status(200).json({
            status: "success",
            data: {
                issue_type,
                sub_category,
                fixes
            }
        });

    } catch (err) {
        logError(req, "500", "GET", "/user/getCustomWorkflow", err.message);
        return res.status(500).json({
            status: "error",
            message: "Internal server error",
        });
    }
};

//agent creates a custom workflow per issue type
exports.editCustomWorkflow = async (req, res) => {

    if (req.userRole !== "agent1" && req.userRole !== "agent2" && req.userRole !== "agent3") {
        logError(req, "401", "PUT", "/user/editCustomWorkflow", "Unautorized call to edit custom workflow")
        return res.status(401).json({
            status: "fail",
            message: "Unauthorized",
        });
    }

    try {
        const id = req.userId;

        const { issue_type, sub_category, fixes } = req.body;


        const inputSchema = Joi.object({
            issue_type: Joi.string().regex(/^[a-zA-Z\s]+$/).max(50).required(),
            sub_category: Joi.string().regex(/^[a-zA-Z\s]+$/).max(50).required(),
            fixes: Joi.array().items(Joi.string().max(10000)).max(30).required(),
        });

        const inputData = { issue_type, sub_category, fixes }

        const validationResult = inputSchema.validate(inputData);

        if (validationResult.error) {
            logError(req, "400", "PUT", "/user/editCustomWorkflow", validationResult.error.details[0].message)
            return res.status(400).json({
                status: "fail",
                message: validationResult.error.details[0].message,
            });
        }

        const matchingIssue = issues.find(
            (issue) => issue.issue_type === issue_type && issue.sub_category === sub_category
        );

        if (!matchingIssue) {
            logError(req, "404", "PUT", "/user/editCustomWorkflow", "Custom workflow not found for the provided issue_type and sub_category.")
            return res.status(404).json({
                status: "fail",
                message: "Custom workflow not found for the provided issue_type and sub_category.",
            });
        }

        const user = await userModel.findOne({ _id: id });

        var issueExists = false;
        for (var i = 0; i < user.custom_workflow.length; i++) {
            if (user.custom_workflow[i].issue_type == issue_type && user.custom_workflow[i].sub_category == sub_category) {
                user.custom_workflow[i].fixes = fixes;
                issueExists = true;
                break;
            }
        }

        if (!issueExists) {
            user.custom_workflow.push({ issue_type, sub_category, fixes });
        }

        await userModel.updateOne({ _id: id }, { $set: { custom_workflow: user.custom_workflow } });

        return res.status(200).json({
            status: "success",
            data: {
                issue_type,
                sub_category,
                fixes
            }
        });

    } catch (err) {
        logError(req, "500", "PUT", "/user/editCustomWorkflow", err.message);
        return res.status(500).json({
            status: "error",
            message: "Internal server error",
        });
    }
};
