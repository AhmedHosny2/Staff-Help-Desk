const { OpenAI } = require("openai");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const start = async () => {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const assistant = await openai.beta.assistants.create({
    name: "DeskMate",
    instructions:
      "DeskMate is a customer service chatbot that can help you with your queries.",
    model: "gpt-3.5-turbo-1106",
  });
  const thread = await openai.beta.threads.create();
  // console.log(thread.id);
  const message = await openai.beta.threads.messages.create(
    thread.id,
    {
      role: "user",
      content: "are you sure ? ",
    }
  );
  const run = await openai.beta.threads.runs.create(
    thread.id,
    {
      assistant_id: assistant.id,
    }
  );
  const checkStatusAndPrintMessages = async (threadId, runId) => {
    let runStatus = await openai.beta.threads.runs.retrieve(threadId, runId);
    if (runStatus.status === "completed") {
      let messages = await openai.beta.threads.messages.list(threadId);
      messages.data.forEach((msg) => {
        const role = msg.role;
        const content = msg.content[0].text.value;
        console.log(
          `${role.charAt(0).toUpperCase() + role.slice(1)}: ${content}`
        );
      });
    } else {
      console.log("Run is not completed yet.");
    }
  };

  setTimeout(() => {
    checkStatusAndPrintMessages(thread.id, run.id);
  }, 7000);  //change the time to appropriate time
};
start();

// async function main() {
//   const completion = await openai.chat.completions.create({
//     messages: [{ role: "user", content: "hello " }],
//     model: "gpt-3.5-turbo",
//   });

//   console.log(completion.choices[0].message.content);
// }
// main();
