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
module.exports = router;
