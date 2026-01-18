const JWT = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).send({
        success: false,
        message: "No token provided",
      });
    }

    const token = req.headers.authorization.split(" ")[1];

    const decoded = JWT.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id;   // ✅ FIXED
    next();

  } catch (error) {
    return res.status(401).send({
      success: false,
      message: "Unauthorized User",
    });
  }
};

module.exports = authMiddleware;
