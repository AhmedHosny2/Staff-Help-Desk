const speakeasy = require("speakeasy");
const qrcode = require("qrcode");
const domain = process.env.DOMAIN;

const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { userModel, brandInfoModel } = require("../model/user");
const getCookiesMFA = require("../utils/2faCookies").getEntriesFromCookie;
const MFAJWTsecret = process.env.ACCESS_TOKEN_SECRET + "2FA";

// Please note we need to send numbers in a string or anyway to make 00001 doesn't give an error use try and catch
exports.enableMfa = async (req, res) => {
  var secret = speakeasy.generateSecret({
    name: "GIU Help Desk",
  });
  var img;
  qrcode.toDataURL(secret.otpauth_url, function (err, data) {
    img = `${data}`;
  });

  const userEmail = req.userEmail;
  const user = await userModel.findOne({ email: req.userEmail });
  console.log(userEmail);
  user.tempPin = secret.ascii;
  await user.save();

  return res.status(200).send({ data: img });
};

exports.verifyMfa = async (req, res) => {
  // useless ??
  const user = await userModel.findOne({ email: req.userEmail });
  const pin = user.tempPin;
  if (!req.body.otp) return res.status(400).send("Please enter a valid otp");

  if (!pin) return res.status(400).send("User don't have 2fa enabled");
  var verified = speakeasy.totp.verify({
    secret: pin,
    encoding: "ascii",
    token: req.body.otp,
  });

  if (verified) {
    user.pin = pin;
    await user.save();

    return res.status(200).send({ msg: "MFA verified!" });
  }

  return res.status(400).send({ msg: "invalid otp!" });
};

// Set jwt cookies using the original secret
exports.validateMfa = async (req, res) => {
  // useless ??
  let email;
  try {
    email = getCookiesMFA(req).email;
  } catch (error) {
    return res.status(400).send({ error: "error" });
  }

  const user = await userModel.findOne({ email: email });
  if (!req.body.otp)
    return res.status(400).send({ msg: "Please enter a valid otp" });

  if (!user.pin)
    return res.status(400).send({ msg: "User don't have 2fa enabled" });

  var verified = speakeasy.totp.verify({
    secret: user.pin,
    encoding: "ascii",
    token: req.body.otp,
  });

  token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1h", // Set your preferred expiration time
    }
  );
  if (verified) {
    res.cookie("authcookie", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      expires: new Date(Date.now() + 10 * 60 * 60 * 1000), // Expires in 1 hour
      domain,
      path: "/",
    });
    return res.status(200).json({
      status: "confirmed",
      data: user,
    });
  }

  return res.status(400).send({ msg: "invalid OTP" });
};

exports.disableMfa = async (req, res) => {
  // useless ??
  // const email = getCookies(req).email;

  const removeOTP = await userModel.findOneAndUpdate(
    { email: req.userEmail },
    { pin: null }
  );

  return res.status(200).send("Deleted Successfully!");
};
