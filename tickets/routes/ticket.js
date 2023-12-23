const express = require("express");
const router = express.Router();
const { limiter } = require('../../users/utils/rateLimiter');
const {
  getAlltickets,
  assignTicket,
  createTicket,
  getUserTickets,
  getAgentTickets,
  solveTicket,
  rateTicketSolution,
  getTicket,
  deleteTicket
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
router.get("/getAgentTickets", getAgentTickets);

router.get("/", getAlltickets);
router.post("/assign", assignTicket);
router.post("/createTicket",limiter, createTicket);
router.put("/rateTicket", rateTicketSolution);
router.put("/solveTicket", solveTicket);
router.post("/reports/performance", generateAgentPerformanceReport);
router.get("/:id",getTicket);
router.delete("/:id",deleteTicket);
module.exports = router;
