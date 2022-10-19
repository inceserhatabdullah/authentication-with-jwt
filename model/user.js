import mongoose from "mongoose";
import config from "../config.js";

// defining the mongoose model schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 5
    },
    email: {
        type: String,
        required: true,
        max: 255,
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6,
    },
    date: {
        type: Date,
        default: Date.now(),
    }
});

export default class {
    #schema = mongoose.model(config.mongo.model.user, userSchema);

    async #findOne(data) {
        return await this.#schema.findOne(data);
    }
    async findOne(data) {
        return await this.#findOne(data);
    }

    async #create(data, save = true) {
        const user = new this.#schema(data);
        return save ? await user.save() : user;
    }
    async create(data, save = true) {
        return this.#create(data, save);
    }
}