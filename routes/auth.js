import express from "express";
import User from "../model/user.js";
import Validation from "../validation/index.js";
import config from "../config.js";

const validate = new Validation();
const user = new User();
const { register, login } = config.routes;
const router = express.Router();

router.post(register, async (req, res) => {
  // validate data before make a user
  const { error } = validate.register(req.body);

  if (error) {
    return res.status(400).send(error); // error.details[0].message
  }

  const person = await user.findOne({ email: req.body.email });
  if (person) {
    // maybe you can return exist user object
    return res.status(403).send({
      message: `${person.email} is already exist!`,
    });
  }

  const hashPassword = await validate.setHashPassword(req.body.password);

  try {
    const savedUser = await user.create({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
    });
    const { _id, name, email, date } = savedUser;
    res.status(201).send({
      _id,
      name,
      email,
      date,
      message: "Account has been successfully created!",
    });
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});

router.post(login, async (req, res) => {
  // validate data before make a user
  const { error } = validate.login(req.body);
  if (error) {
    return res.status(400).send(error); // error.details[0].message
  }

  const person = await user.findOne({ email: req.body.email });
  if (!person) {
    return res.status(404).send({
      message: `${req.body.email} is not found!`,
    });
  }

  const validPass = await validate.compareHashPassword({
    request: req.body.password,
    user: person.password,
  });

  if (!validPass) {
    return res.status(401).send({
      message: "Invalid password!",
    });
  }

  const token = validate.sign(person._id);
  res.header("Authorization", `Bearer ${token}`).send({
    access_token: token
  });
});
export default router;
