const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const { userModel, brandInfoModel } = require('../model/user');
const getCookiesMFA = require('../utils/2faCookies').getEntriesFromCookie;
const MFAJWTsecret = process.env.ACCESS_TOKEN_SECRET + '2FA';

// Please note we need to send numbers in a string or anyway to make 00001 doesn't give an error use try and catch
exports.enableMfa = async (req, res) => {
	var secret = speakeasy.generateSecret({
		name: 'GIU Help Desk',
	});
	var img;
	qrcode.toDataURL(secret.otpauth_url, function (err, data) {
		img = `<img src="${data}" />`;
	});

	const userEmail =req.userEmail ;
	const user = await userModel.findOne({ email: userEmail });
	user.tempPin = secret.ascii;
	await user.save();

	return res.status(200).send(img);
};

exports.verifyMfa = async (req, res) => {
	// useless ?? 
	// const email = getCookies(req).email;
	const user = await userModel.findOne({ email: userEmail });
	const pin = user.tempPin;
	if (!req.body.otp) return res.status(400).send('Please enter a valid otp');

	if (!pin) return res.status(400).send("User don't have 2fa enabled");
	var verified = speakeasy.totp.verify({
		secret: pin,
		encoding: 'ascii',
		token: req.body.otp,
	});

	if (verified) {
		user.pin = pin;
		await user.save();

		return res.status(200).send('MFA verified!');
	}

	return res.status(400).send('Invalid otp');
};

// Set jwt cookies using the original secret
exports.validateMfa = async (req, res) => {
	// useless ??
	// const email = getCookiesMFA(req).email;

	const user = await userModel.findOne({ email: userEmail });
	const pin = user.pin;
	if (!req.body.otp) return res.status(400).send('Please enter a valid otp');

	if (!pin) return res.status(400).send("User don't have 2fa enabled");

	var verified = speakeasy.totp.verify({
		secret: pin,
		encoding: 'ascii',
		token: req.body.otp,
	});

	if (verified) {
		return res.status(200).send('you are logged in successfully ');
	}

	return res.status(400).send('invalid OTP');
};

exports.disableMfa = async (req, res) => {
	// useless ??
	// const email = getCookies(req).email;

	const user = await userModel.findOne({ email: userEmail });
	const removeOTP = await userModel.findOneAndUpdate({ email: userEmail }, { pin: null });

	return res.status(200).send('Deleted Successfully!');
};
