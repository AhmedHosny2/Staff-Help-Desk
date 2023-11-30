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

const {
  generateTicketStatusReport,
  generateAgentPerformanceReport,
  generateResolutionTimeReport
} = require("../controller/reportsData"); // assignTicket

// const {
//   verifyToken,
//   verifyRole,
//   testVerifyRole,
//   testVerifyToken,
// } = require("../middleware/auth");
// router.use(verifyToken);
router.get("/getUserTickets", getUserTickets);
router.get("/", getAlltickets);
router.post("/assign", assignTicket);
router.post("/createTicket", createTicket);
router.put("/rateTicket", rateTicketSolution);
router.put("/solveTicket", solveTicket);
router.post("/reports/status", generateTicketStatusReport);
router.post("/reports/performance", generateAgentPerformanceReport);
router.post("/reports/agents", generateResolutionTimeReport);

module.exports = router;
