import express from "express";
import verifyToken from "./verify.js";
import config from "../config.js";

const router = express.Router();

router.get(config.routes.post, verifyToken, async (req, res) => {
  res.json({
    posts: {
      user: req.user.id,
      title: "JWT Authentication",
      description: "Forbidden data for user without token",
    },
  });
});
export default router;
