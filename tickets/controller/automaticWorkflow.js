const { automaticWorkFlowModel } = require("../model/ticket");

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

        if (!issue_type || !sub_category) {
            res.status(400).json({
                status: "fail",
                message: "issue_type and sub_category are required parameters.",
            });
            return;
        }

        const automaticWorkFlow = await automaticWorkFlowModel.findOne({ issue_type, sub_category });
        if (automaticWorkFlow) {
            res.status(200).json({
                status: "success",
                data: automaticWorkFlow,
            });
        } else {
            res.status(404).json({
                status: "fail",
                message: "Automatic workflow not found for the provided issue_type and sub_category.",
            });
        }
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "Internal server error",
        });
    }
};

//manager updates automatic workflow for a specific issue type and sub_category
exports.updateAutomaticWorkFlow = async (req, res) => {
    try {
        const { issue_type, sub_category, fixes } = req.body;

        if (!issue_type || !sub_category || !fixes) {
            res.status(400).json({
                status: "fail",
                message: "issue_type, sub_category, and fixes are required parameters.",
            });
            return;
        }

        const result = await automaticWorkFlowModel.updateOne({ issue_type, sub_category }, { $set: { fixes } });

        if (result.modifiedCount === 0) {
            res.status(404).json({
                status: "fail",
                message: "No matching document found for the provided issue type and sub category.",
            });
            return;
        }
        res.status(200).json({
            status: "success",
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "Internal server error",
        });
    }
};
