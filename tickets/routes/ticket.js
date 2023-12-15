const express = require("express");
const router = express.Router();

const {
  getAlltickets,
  assignTicket,
  createTicket,
  getUserTickets,
  solveTicket,
  rateTicketSolution,
} = require("../controller/ticket"); // assignTicket
const { verifyToken, verfiyRole } = require("../utils/middleware");

const {
  getAutomaticWorkFlow,
  updateAutomaticWorkFlow,
} = require("../controller/automaticWorkflow");

const {
  generateTicketStatusReport,
  generateAgentPerformanceReport,
  generateResolutionTimeReport,
} = require("../controller/reportsData"); // assignTicket

router.get("/getAutomaticWorkFlow", getAutomaticWorkFlow);

router.use(verifyToken);
router.use(verfiyRole);
router.put("/updateAutomaticWorkFlow", updateAutomaticWorkFlow);
router.get("/getUserTickets", getUserTickets);
router.get("/", getAlltickets);
router.post("/assign", assignTicket);
router.post("/createTicket", createTicket);
router.put("/rateTicket", rateTicketSolution);
router.put("/solveTicket", solveTicket);
router.post("/reports/performance", generateAgentPerformanceReport);

module.exports = router;
