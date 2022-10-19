import dotenv from "dotenv";
dotenv.config();

export default {
  mongo: {
    connectionUrl: process.env.MONGODB_CONNECTION || "<your_connection_url>",
    model: {
      user: process.env.MONGODB_USER_MODEL_NAME || "user",
    },
  },
  authentication: {
    secret: process.env.TOKEN_SECRET || "<your_secret>",
  },
  server: {
    port: process.env.PORT || 3000,
  },
  routes: {
    user: "/user",
    login: "/login",
    register: "/register",
    post: "/post"
  }
};
