import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asnycHandler.util.js";
import { ApiError } from "../utils/ApiError.util.js";
const requireAuth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
      if (err) {
        res.status(401).send("Invalid token");
      } else {
        req.user = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).send("Unauthorized");
  }
};

const verifyAdmin = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new ApiError(400, "Unautherized request");
    }
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decodedToken?._id);
    if (!user) {
      throw new ApiError(400, "Invalid access token");
    }
    if (user.role !== "admin") {
      throw new ApiError(403, "You are not an admin");
    }
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(400, error?.message || "Something went wrong!");
  }
});

export { requireAuth, verifyAdmin };
