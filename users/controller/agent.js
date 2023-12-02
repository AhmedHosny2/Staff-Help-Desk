const { userModel } = require('../model/user');

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
    try {
        const { id } = req.params;

        const { issue_type, sub_category } = req.query;

        if (!issue_type || !sub_category) {
            res.status(400).json({
                status: "fail",
                message: "issue_type and sub_category are required parameters.",
            });
            return;
        }

        const matchingIssue = issues.find(
            (issue) => issue.issue_type === issue_type && issue.sub_category === sub_category
        );

        if (!matchingIssue) {
            res.status(404).json({
                status: "fail",
                message: "Custom workflow not found for the provided issue_type and sub_category.",
            });
        }

        const user = await userModel.findOne({ _id: ObjectId(id) });

        var fixes;
        for (var i = 0; i < user.custom_workflow.length; i++) {
            if (user.custom_workflow[i].issue_type == issue_type && user.custom_workflow[i].sub_category == sub_category) {
                fixes = user.custom_workflow[i].fixes;
                break;
            }
        }

        res.status(200).json({
            status: "success",
            data: {
                issue_type,
                sub_category,
                fixes
            }
        });

    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "Internal server error",
        });
    }
};

//agent creates a custom workflow per issue type
exports.editCustomWorkflow = async (req, res) => {
    try {
        const { id } = req.params;

        const { issue_type, sub_category, fixes } = req.body;

        if (!issue_type || !sub_category || !fixes) {
            res.status(400).json({
                status: "fail",
                message: "issue_type, sub_category, and fixes are required parameters.",
            });
            return;
        }

        const matchingIssue = issues.find(
            (issue) => issue.issue_type === issue_type && issue.sub_category === sub_category
        );

        if (!matchingIssue) {
            res.status(404).json({
                status: "fail",
                message: "Custom workflow not found for the provided issue_type and sub_category.",
            });
        }

        const user = await userModel.findOne({ _id: ObjectId(id) });

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

        await userModel.updateOne({ _id: ObjectId(id) }, { $set: { custom_workflow } });

        res.status(200).json({
            status: "success",
            data: {
                issue_type,
                sub_category,
                fixes
            }
        });

    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "Internal server error",
        });
    }
};
