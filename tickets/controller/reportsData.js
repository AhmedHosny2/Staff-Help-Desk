const { ticketModel } = require("../model/ticket");
const { userModel, brandInfoModel } = require('../../users/model/user');
const {getAgentsData} =require("./ticket");
exports.generateTicketStatusReport = async (req, res) => {
    const ratings = [1, 2, 3, 4, 5];
    const statusCounts = {};
  
    for (const rating of ratings) {
      const tickets = await ticketModel.find({ status: 'closed', rating });
      statusCounts[rating] = tickets.length;
    }
  
    res.status(200).json({ statusCounts });
  };

  
  exports.generateAgentPerformanceReport = async (req, res) => {
    const agents = await getAgentsData(req)
    console.log(agents)
    const agentPerformanceData = {};
  
    for (const agent of agents) {
      const tickets = await ticketModel.find({ agentId: agent.id,status: 'closed'  });
      if (tickets.length > 0) {

      const totalResolutionTime = tickets.reduce((sum, ticket) => {
        const resolutionTime = ticket.timeSolved - ticket.timeCreated;
        return sum + resolutionTime;
      }, 0);
  
      const averageResolutionTime = totalResolutionTime / tickets.length;
      const averageRating = tickets.reduce((sum, ticket) => sum + ticket.rating, 0) / tickets.length;
  
      agentPerformanceData[agent.id] = {
        averageResolutionTime,
        averageRating,
      }; } else{agentPerformanceData[agent.id] = "no enough data."}
    }
  
    res.status(200).json({ agentPerformanceData });
  };

 

  // to find if resolution time is related to rating, different approach to return everything and filter in front end.

  exports.generateResolutionTimeReport = async (req, res) => {
    const ratings = [1, 2, 3, 4, 5];
    const averageResolutionTimes = {};
  
    for (const rating of ratings) {
      const tickets = await ticketModel.find({ rating, status: 'closed' });
      console.log(tickets)
      if (tickets.length > 0) {
      const totalResolutionTime = tickets.reduce((sum, ticket) => {
        const resolutionTime = new Date(ticket.timeSolved) - new Date(ticket.timeCreated);
        
                return sum + resolutionTime;
      }, 0);
  
      var averageResolutionTime = totalResolutionTime / tickets.length;
      averageResolutionTime /=1000;
      const days = Math.floor(averageResolutionTime / (24 * 60 * 60));
      const hours = Math.floor((averageResolutionTime % (24 * 60 * 60)) / (60 * 60));
      const minutes = Math.floor((averageResolutionTime % (60 * 60)) / 60);
      const remainingSeconds = Math.floor(averageResolutionTime % 60);
      const resolutionTimeString = `${days} days, ${hours} hours, ${minutes} minutes, and ${remainingSeconds} seconds`;
      averageResolutionTimes[rating] = resolutionTimeString;
    } else {
        averageResolutionTimes[rating] = "No enough data yet."
    }
    }
  
    res.status(200).json({ averageResolutionTimes });
  };