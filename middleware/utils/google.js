const { OAuth2Client } =require('google-auth-library');

const clientId = '456191344666-egi4o97655s7fgieoiv0tf8em5q8e1d2.apps.googleusercontent.com';

const googleSignIn = async (req, res) => {
  const { token } = req.body;

  const client = new OAuth2Client(clientId);

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: clientId,
    });

    const payload = ticket.getPayload();
    const userId = payload.sub;

    // TODO: Perform additional validation and user handling

    // Return a success response or set cookies/tokens as needed
    res.status(200).json({
      status: 'success',
      message: 'Google Sign-In successful',
      user: payload,
    });
  } catch (error) {
    console.error('Google Sign-In Error:', error.message);
    res.status(401).json({
      status: 'fail',
      message: 'Google Sign-In failed',
    });
  }
};

module.exports ={ googleSignIn };
