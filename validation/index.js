import Joi from "@hapi/joi";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config.js";

export default class {
  #schema;

  #register(data) {
    this.#makeRules();
    return this.#schema.validate(data);
  }

  #login(data) {
    this.#makeRules();
    return this.#schema.validate(data);
  }

  #makeRules() {
    this.#schema = Joi.object({
      name: Joi.string().min(6),
      email: Joi.string().min(6).required().email(),
      password: Joi.string().min(6).required(),
    });
  }

  register(data) {
    return this.#register(data);
  }

  login(data) {
    return this.#login(data);
  }

  async #setHashPassword(password) {
    const _ = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, _);
  }
  async setHashPassword(password) {
    return this.#setHashPassword(password);
  }

  async #compareHashPassword(password) {
    return await bcrypt.compare(password.request, password.user);
  }

  async compareHashPassword(password) {
    return this.#compareHashPassword(password);
  }

  #token(token) {
    return jwt.verify(token, config.authentication.secret);
  }

  token(token) {
    return this.#token(token);
  }

  #sign(id) {
    return jwt.sign(
      {
        id,
      },
      config.authentication.secret
    );
  }

  sign(id) {
    return this.#sign(id);
  }
}
