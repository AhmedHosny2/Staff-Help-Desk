// make test controoler reutrn all users
 
const userModel = require("../model/user");
const secret = process.env.ACCESS_TOKEN_SECRET;
const jwt = require('jsonwebtoken');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json({
      status: "success",
      data: users,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.sendResetToken = async (req, res) => {
 
    const {email} = req.body
    const payload = {
      email: email,
    };
    const options = {
      expiresIn: '1 hour',
    }

    try {
      const token = jwt.sign(payload,secret,options)
      // Should be configured resetPasswordTemplate.sendResetPassword(email,token)
      console.log(token)
      // to be done
      // check if email exists on our db or not
      res.status(200).send("A reset password link will be sent to this email if it exists on our website!")
  
    } catch (error) {
      res.status(400).send("Enter a vaild email!")
    }


};

exports.confirmResetToken = async (req, res) => {
 
  const secretKey = config.secretKey
  const {token} = req.params 
  const password = req.body.password
  if(!token)
  return res.status(400).send("Please send a vaild token")
  if(!password)
  return res.status(400).send("Password can't be empty!")
  try {
    const decoded = jwt.verify(token, secretKey);
  const user = await db("se_project.users")
  .where({ "email": decoded.email })
  .update({ password: password });

  } catch (error) {
    return res.status(400).send("Please send a vaild token")
  }
  return res.status(200).send("Password reset successfully!")


};


