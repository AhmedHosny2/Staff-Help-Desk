// const User = require('../model/User')
const Room = require("../model/Room");
const Message = require("../model/Message");
const asyncHandler = require("express-async-handler");
const { USER_BASE_URL } = require("../services/BaseURLs");
const crypto = require("crypto"); //this one can kill Secutity studets  hahah
const algorithm = "aes-256-cbc"; //Using AES encryption
require("dotenv").config();
const key = Buffer.from(process.env.ENCRYPTION_KEY, "hex");
const iv = Buffer.from(process.env.IV, "hex"); // Convert IV from hex string to Buffer//Encrypting text
const Joi = require("joi");

function encrypt(text) {
  try {
    let cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return encrypted.toString("hex");
  } catch (err) {
    console.log(err);
  }
  return text;
}

// Decrypting text
function decrypt(text) {
  try {
    let encryptedText = Buffer.from(text, "hex");
    let decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  } catch (err) {
    return text;
  }
  return text;
}

//looks ok
const getUnreadCount = asyncHandler(async (type, from, to) => {
  const filter = type === "room" ? [to] : [from, to];
  const messageReaders = await Message.find({ sender: { $ne: from } })
    .all("users", filter)
    .select(["readers"])
    .sort({ createdAt: -1 })
    .lean();

  return (
    messageReaders.filter(({ readers }) => readers.indexOf(from) === -1)
      .length || 0
  );
});
// looks ok

const getMessageInfo = asyncHandler(async (type, from, to) => {
  const filter = type === "room" ? [to] : [from, to];
  const message = await Message.findOne()
    .all("users", filter)
    .select(["message", "sender", "updatedAt", "readers"])
    .sort({ createdAt: -1 })
    .lean();
  if (!message) return null;
  const unreadCount = await getUnreadCount(type, from, to);
  const decryptedMessage = decrypt(message.message);
  return {
    message: decryptedMessage,
    sender: message.sender,
    updatedAt: message.updatedAt,
    unreadCount,
  };
});

const getUsersData = async function (req) {
  // we will call function that sends the three agents ids and untilization
  const id = req.userId;
  console;
  // console.log(`${USER_BASE_URL}/profile`);
  const response = await fetch(`${USER_BASE_URL}/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: req.headers.cookie,
    },
    Credentials: "include",
  });
  const data = await response.json();
  user = data.data;
  // console.log("user data" + user);
  return user;
};

const getAllUsers = async function (req) {
  // we will call function that sends the three agents ids and untilization
  const id = req.userId;
  const response = await fetch(`${USER_BASE_URL}/getUserDataForChat`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: req.headers.cookie,
    },
    Credentials: "include",
  });
  const data = await response.json();
  user = data.data;
  // console.log("user data" + user);
  return user;
};

//testing api
exports.test = async (req, res) => {
  //  const user = await getUsersData(req)
  const user = await getAllUsers(req);
  // console.log(user);
  return res.status(200).json({ data: user });
};
// get user contacts
// this api has been called in the backend
exports.getUserContacts = asyncHandler(async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId)
      return res.status(400).json({ message: "Missing required information." });

    const users = await getAllUsers(req);
    const rooms = await Room.find()
      .all("users", [userId])
      .select(["name", "users", "avatarImage", "chatType"])
      .sort({ updatedAt: -1 })
      .lean();
    const contacts = users.concat(rooms);
    const contactWithMessages = await Promise.all(
      contacts.map(async (contact) => {
        const { _id, chatType: type } = contact;
        const messageInfo = await getMessageInfo(
          type,
          userId,
          _id // danger here =======================================
        );

        return {
          ...contact,
          ...messageInfo,
        };
      })
    );
    return res.status(200).json({ data: contactWithMessages });
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
});
// =================================================================================================================
exports.getUserMessages = asyncHandler(async (req, res) => {
  try {
    const userId = req.userId;
    const { type, chatId } = req.query;
    if (!userId || !type || !chatId) {
      return res.status(400).json({ message: "Missing required information." });
    }
    //658481311c78b7c2cfdbc348
    //65814c05d03a8c84cff1b55f
    const filter = type === "room" ? [chatId] : [userId, chatId];
    const messages = await Message.find()
      .all("users", filter)
      .sort({ createdAt: 1 })
      .lean();

    const messagesWithAvatar = await Promise.all(
      messages.map(async (msg) => {
        const senderId = msg.sender;
        console.log(msg.message);
        //decrypting the message
        msg.message = decrypt(msg.message);
        // msg.message = decrypt(msg.message);
        // const user = await User.findById(senderId).lean();
        // yaya fix 32
        return {
          ...msg,
          //TODO get the pic from the user
        };
      })
    );
    console.log("messagesWithAvatar" + messagesWithAvatar);

    return res.status(200).json({ data: messagesWithAvatar });
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
});
const postUserMessageSchema = Joi.object({
  chatId: Joi.string().required(),
  message: Joi.string().required().max(1000),
});
exports.postUserMessage = asyncHandler(async (req, res) => {
  try {
    const userId = req.userId;
    const { chatId } = req.query;
    const { message } = req.body;
    const validation = postUserMessageSchema.validate({ chatId, message });
    if (validation.error) {
      return res
        .status(400)
        .json({ message: validation.error.details[0].message });
    }

    console.log("message" + message);
    const encryptedMessage = await encrypt(message);
    console.log("dycrpt  \n " + decrypt(encryptedMessage));
    if (!userId || !chatId || !message) {
      return res.status(400).json({ message: "Missing required information." });
    }

    const newMessage = await Message.create({
      message: encryptedMessage,
      users: [userId, chatId],
      sender: userId,
      readers: [],
    });

    return res.status(200).json({ data: newMessage });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

exports.postRoom = asyncHandler(async (req, res, next) => {
  try {
    const userId = req.userId;
    const { name, users, avatarImage } = req.body;

    const data = await Room.create({
      name,
      users: [...users, userId],
      avatarImage,
      chatType: "room",
    });

    return res.json({ data, messages: "Successfully created a room." });
  } catch (err) {
    return res.status(500).json({ message: e.message });
  }
});

// // UPDATE

exports.updateMessageReadStatus = asyncHandler(async (req, res) => {
  try {
    const userId = req.userId;
    const { type, chatId } = req.query;

    if (!userId || !type || !chatId) {
      return res.status(400).json({ message: "Missing required information." });
    }

    const filter = type === "room" ? [chatId] : [userId, chatId];

    const messages = await Message.find({ sender: { $ne: userId } })
      .all("users", filter)
      .sort({ createdAt: 1 });

    const messageReaderMap = messages.reduce((prev, curr) => {
      return { ...prev, [curr._id.toHexString()]: curr.readers };
    }, {});

    Object.entries(messageReaderMap).forEach(([key, value]) => {
      const userHasRead = value.indexOf(userId) > -1;
      if (!userHasRead) messageReaderMap[key].push(userId);
    });

    await Promise.all(
      Object.keys(messageReaderMap).map(async (msgId) => {
        return await Message.findByIdAndUpdate(
          { _id: msgId },
          { readers: messageReaderMap[msgId] },
          { new: true }
        ).lean();
      })
    );

    return res
      .status(200)
      .json({ data: null, message: "Successfully updated." });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// module.exports = {
//   getUserContacts,
//   getUserMessages,
//   postUserMessage,
//   postRoom,
//   updateMessageReadStatus
// }
