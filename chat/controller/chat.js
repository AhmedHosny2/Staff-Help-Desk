const { sleep } = require("openai/core");
const chatModel = require("../model/chat");
const { OpenAI } = require("openai");
exports.getAllchats = async (req, res) => {
  try {
    const chats = await chatModel.find();
    res.status(200).json({
      status: "success",
      data: chats,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.sendMessages = async (req, res) => {
  const { userId } = req;
  if (!userId) {
    return res.status(401).json({
      status: "fail",
      message: "Unauthorized",
    });
  }
  const { userMessage } = req.body;

  const isCreated = await chatModel.findOne({ userId });
  let assistant_id, thread_id;
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  if (!isCreated) {
    const assistant = await openai.beta.assistants.create({
      name: "DeskMate",
      instructions:
        "DeskMate is a customer service chatbot that can help you with your queries.",
      model: "gpt-3.5-turbo-1106",
    });
    const thread = await openai.beta.threads.create();
    assistant_id = assistant.id;
    thread_id = thread.id;
  } else {
    assistant_id = isCreated.assistantId;
    thread_id = isCreated.threadId;
  }
  // call the bot

  const message = await openai.beta.threads.messages.create(thread_id, {
    role: "user",
    content: userMessage,
  });
  console.log(message);
  const run = await openai.beta.threads.runs.create(thread_id, {
    assistant_id,
  });

  const checkStatusAndPrintMessages = async (threadId, runId) => {
    let runStatus = await openai.beta.threads.runs.retrieve(threadId, runId);
    let response;
    if (runStatus.status === "completed") {
      let messages = await openai.beta.threads.messages.list(threadId);
      messages.data.forEach((msg) => {
        const content = msg.content[0].text.value;
        response = !response ? content : response;
        console.log(`${msg.role}: ${msg.content[0].text.value}`);
      });
    } else {
      console.log("Run is not completed yet.");
    }
    return response;
  };
  async function pollStatusAndPrintMessages(thread_id, run_id, res) {
    const checkStatus = async () => {
      const response = await checkStatusAndPrintMessages(thread_id, run_id);
      if (response) {
        if (isCreated) {
          await chatModel.findOneAndUpdate({ userId }, { $push: { response } });
        } else {
          await chatModel.create({
            userId,
            message: userMessage,
            response,
            threadId: thread_id,
            assistantId: assistant_id,
          });
        }
        res.status(200).json({
          status: "success",
          data: response,
        });
      } else {
        setTimeout(checkStatus, 1000);
      }
    };

    checkStatus();
  }

  // Usage
  pollStatusAndPrintMessages(thread_id, run.id, res);

  // setTimeout(() => {
  //   checkStatusAndPrintMessages(thread_id, run.id);

  // }, 7000); //change the time to appropriate time
};
