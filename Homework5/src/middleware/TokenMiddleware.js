const crypto = require('crypto');

const TOKEN_COOKIE_NAME = "NCParksToken";

const SECRET_KEY = process.env.API_SECRET_KEY;

console.log(SECRET_KEY);
function base64UrlEncode(str) {
  return Buffer.from(str).toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

exports.TokenMiddleware = (req, res, next) => {
  // We will look for the token in two places:
  // 1. A cookie in case of a browser
  // 2. The Authorization header in case of a different client
  let token = null;
  if (!req.cookies[TOKEN_COOKIE_NAME]) {
    //No cookie, so let's check Authorization header
    const authHeader = req.get('Authorization');
    if (authHeader && authHeader.startsWith("Bearer ")) {
      //Format should be "Bearer token" but we only need the token
      token = authHeader.split(" ")[1].trim();
    }
  }
  else { //We do have a cookie with a token
    token = req.cookies[TOKEN_COOKIE_NAME]; //Get session Id from cookie
  }

  if (!token) { // If we don't have a token
    res.status(401).json({ error: 'Not authenticated' });
    return;
  }

  //If we've made it this far, we have a token. We need to validate it

  const parts = token.split('.');
  if (parts.length !== 3) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  const encodedHeader = parts[0];
  const encodedPayload = parts[1];
  const signature = parts[2];

  const computedSignature = crypto.createHmac('sha256', SECRET_KEY)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  if (signature !== computedSignature) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  const payload = JSON.parse(Buffer.from(encodedPayload, 'base64').toString());

  if (Date.now() >= payload.exp * 1000) {
    return res.status(401).json({ error: 'Token expired' });
  }

  req.user = payload.user;
  next();
}


exports.generateToken = (req, res, user) => {

  const header = {
    alg: "HS256",
    typ: "JWT"
  }

  const payload = {
    user: user,
    exp: Math.floor(Date.now() / 1000) + (60 * 60) // Expires in one hour
  };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const signature = crypto.createHmac('sha256', SECRET_KEY)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  const token = `${encodedHeader}.${encodedPayload}.${signature}`;

  //send token in cookie to client
  res.cookie(TOKEN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    maxAge: 2 * 60 * 1000 // This session expires in 2 minutes.. but token expires in 1 hour!
  });
};


exports.removeToken = (req, res) => {
  //send session ID in cookie to client
  res.cookie(TOKEN_COOKIE_NAME, "", {
    httpOnly: true,
    secure: true,
    maxAge: -360000 //A date in the past
  });

}

