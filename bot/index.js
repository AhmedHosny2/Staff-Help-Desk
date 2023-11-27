const { OpenAI } = require("openai");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

console.log(process.env.OPENAI_API_KEY);
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: "but how " }],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
}
main();
