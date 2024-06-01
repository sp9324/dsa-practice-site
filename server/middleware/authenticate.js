import jwt from "jsonwebtoken";

const authenticate = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    console.log("token_auth: ", token);
    if (!token) {
      return res.status(403).send("Access Denied");
    }

    if (token.startsWith("Bearer ")) {
      // token = token.slice(7, token.length).trimLeft();
      token=token.split(' ')[1];
      console.log("token_sliced: ", token);
    }

    const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    console.log("error: ", err);
    res.status(500).json({ error: err.message });
  }
};

export default authenticate;