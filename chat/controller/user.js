// const User = require('../model/User')
const Room = require("../model/Room");
const Message = require("../model/Message");
const asyncHandler = require("express-async-handler");
const { USER_BASE_URL } = require("../services/BaseURLs");

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

  const unreadCount = await getUnreadCount(type, from, to);

  return {
    latestMessage: message?.message || null,
    latestMessageSender: message?.sender || null,
    latestMessageUpdatedAt: message?.updatedAt || null,
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
  console;
  console.log(`${USER_BASE_URL}/`);
  const response = await fetch(`${USER_BASE_URL}/`, {
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
// // DONE
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
    let x = 0;
    const contacts = users.concat(rooms);
    const contactWithMessages = await Promise.all(
      contacts.map(async (contact) => {
        const { _id, chatType: type } = contact;
        if (!x) console.log(" ccc \n\n\n" + contact);
        x = 1;
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
// lesa TODO
exports.getUserMessages = asyncHandler(async (req, res) => {
  try {
    const userId = req.userId;
    const { type, chatId } = req.query;

    if (!userId || !type || !chatId) {
      return res.status(400).json({ message: "Missing required information." });
    }

    const filter = type === "room" ? [chatId] : [userId, chatId];
    const messages = await Message.find()
      .all("users", filter)
      .sort({ createdAt: 1 })
      .lean();

    const messagesWithAvatar = await Promise.all(
      messages.map(async (msg) => {
        const senderId = msg.sender;
        // const user = await User.findById(senderId).lean()
        return {
          ...msg,
          // avatarImage: user.avatarImage
          //TODO get the pic from the user
        };
      })
    );

    return res.status(200).json({ data: messagesWithAvatar });
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
});

// // lesa
exports.postUserMessage = asyncHandler(async (req, res) => {
  try {
    const userId = req.userId;
    const { chatId } = req.query;
    const { message } = req.body;

    if (!userId || !chatId || !message) {
      return res.status(400).json({ message: "Missing required information." });
    }

    const newMessage = await Message.create({
      message,
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

    if (!userId || !name || !users) {
      return res.status(400).json({ message: "Missing required information." });
    }

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
