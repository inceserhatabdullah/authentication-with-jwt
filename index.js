import express from "express";
import authRoute from "./routes/auth.js";
import postsRoute from "./routes/posts.js";
import config from "./config.js";
import mongooseConnection from "./database/connection.js";

const { port } = config.server;
const { user } = config.routes;

// connection to mongodb server
mongooseConnection;
const app = express();

// middleware
app.use(express.json());

// route middleware
app.use(user, authRoute);
app.use(user, postsRoute);

app.listen(port, () => console.log(`Server is running on ${port}`));
