const { ticketModel } = require("../model/ticket");
const { userModel, brandInfoModel } = require('../../users/model/user');
const {getAgentsDataReport} =require("./ticket");


  
const ticketsCount = async () => {return await ticketModel.countDocuments()} // Count of all tickets including opened.

const ticketsAvgRating = async function () { // Rating of all closed Tickets which were rated. 
  const tickets = await ticketModel.find({ status: 'closed',rating: { $ne: null }});
//console.log(tickets)
  const totalRating = tickets.reduce((sum, ticket) => {
    return sum + ticket.rating;
  }, 0);

  return totalRating *(1.0)/ tickets.length 
}

// Joining using db failed 
// Joined using backend 
const AgentsTickets = async function (req) {
  // let data = await userModel.aggregate([
  //   {
  //     $lookup: {
  //       from: 'ticketModel',
  //       localField: "_id", // Corrected localField
  //       foreignField: "agentId",
  //       as: "tickets"
  //     }
  //   }
  // ]);
  const agents =  (await getAgentsDataReport(req)).data

  //console.log(agents)
  const tickets =    await ticketModel.find({  });

  //console.log(tickets)
  // Function to perform the join

    const data = agents.map(agent => {
      const agentTickets = tickets.filter(ticket => ticket.agentId == agent._id);
      return { ...agent, tickets: agentTickets };
    });
 

  return data;
}
// Working  
const ticketsNumPerAgent = async function (req) {
  const agentsData = await AgentsTickets(req)
  const ticketsPerAgent = agentsData.map(agent => {
    agentId: agent._id,
    agentName= `${agent.firstName} ${agent.lastName}`,
    role=`${agent.role}`,
    numberOfTickets= agent.tickets.length,
    openedTickets= agent.tickets.filter(ticket => ticket.status === 'open'),
    solvedTickets= agent.tickets.filter(ticket => ticket.status === 'closed'),
    pendingTickets= agent.tickets.filter(ticket => ticket.status === 'pending'),
     avgRating = solvedTickets.length > 0
    ? solvedTickets.reduce((sum, ticket) => sum + (ticket.rating != null ? ticket.rating*(1.0) : 5.0), 0) / solvedTickets.length
    : 0;


    return {
      agentId: agent._id,
      agentName: `${agent.firstName} ${agent.lastName}`,
      role: agent.role,
      numberOfTickets: agent.tickets.length,
      openedTickets: agent.tickets.filter(ticket => ticket.status === 'open').length,
      solvedTickets: solvedTickets.length,
      pendingTickets: agent.tickets.filter(ticket => ticket.status === 'pending').length,
      avgRating: avgRating,
    };

  }
  
  
  );

  
  return(ticketsPerAgent);
}

const agentOpenTickets = async function (req)  {
  let agentsAndTickets =await ticketsNumPerAgent(req)
  const agentWithMostOpenedTickets = agentsAndTickets.reduce((maxAgent, currentAgent) => {
    return currentAgent.openedTickets > maxAgent.openedTickets ? currentAgent : maxAgent;
  }, { openedTickets: 0 });
  //console.log(agentWithMostOpenedTickets)
  return agentWithMostOpenedTickets
}

const agentSolvedTickets = async function (req) {
  let agentsAndTickets = await ticketsNumPerAgent(req);

  const agentWithMostSolvedTickets = agentsAndTickets.reduce((maxAgent, currentAgent) => {
    return currentAgent.solvedTickets > maxAgent.solvedTickets ? currentAgent : maxAgent;
  }, { solvedTickets: 0 });

  // console.log(agentWithMostSolvedTickets);
  return agentWithMostSolvedTickets;
};


  exports.generateAgentPerformanceReport = async (req, res) => {
    //console.log(req)
    let agents = await getAgentsDataReport(req) // 1 
    // 
    let countOfTickets = await ticketsCount(req) // 2
    
    let avgRateAllTickets = await ticketsAvgRating(req) //3 

    let mostOpenedAgent = await agentOpenTickets(req) // 4

    let mostSolvedAgent = await agentSolvedTickets(req) //5 

    let agentsWithStats = await ticketsNumPerAgent(req) // 6


    res.status(200).json({ agents:agents,numberOfTickets: countOfTickets, averageRating: avgRateAllTickets, agentWithMostOpenedTickets:mostOpenedAgent,agentWithMostSolvedTickets:mostSolvedAgent
    ,agentsStats:agentsWithStats });
  };

 

  // to find if resolution time is related to rating, different approach to return everything and filter in front end.

 