import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
const service_module = "TOKEN_MODULE";

const secret = process.env.JWT_SECRET_KEY;

function verifyJWT(token) {
  try {
    const decoded = jwt.verify(token, secret);

    // Check if token has expired
    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (decoded.exp < currentTimestamp) {
      return [false, "Token has expired"];
    }

    return [true, decoded];
  } catch (error) {
   // Logger.error("error in verifying Jwt", { service: service_module }, err);

    return false;
  }
}

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    // console.log(`Received ${token} as token. Authorization failed!`);

    return res.status(401); // if there isn't any token
  }

  const result = await verifyJWT(token);

  if (!result[0]) {
    // console.log(`Token: ${token} is invalid. Unauthorized!`);

    return res.status(403).json({
      statusCode: 403,
      message: result[1],
    });
  }

  // console.log(`Token: ${token} is varified and authorized.`);
  next();

  return true;
};

export default verifyToken;
