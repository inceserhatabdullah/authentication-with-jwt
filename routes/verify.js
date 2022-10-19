import Validate from "../validation/index.js";

const validate = new Validate();

export default function (req, res, next) {
  let header = req.header("Authorization");
  if (!header) {
    return res.status(401).send({
      message: "Access Denied!"
    });
  }

  const bearer = header.split(" "),
  token = bearer[1];

  try {
    const verified = validate.token(token);
    req.user = verified;
    next();

  } catch (e) { 
    res.status(401).send({
      message: `${token} is invalid!`
    });
  }
}
