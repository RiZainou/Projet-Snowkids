const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */
const playerRouter = require("./players/routers");

router.use("/players", playerRouter);

const postRouter = require("./posts/router");

router.use("/posts", postRouter);

const roleRouter = require("./roles/router");

router.use("/roles", roleRouter);

const teamRouter = require("./teams/router");

router.use("/teams", teamRouter);

const userRouter = require("./users/router");

router.use("/users", userRouter);

const authRouter = require("./auth/router");

router.use("/auth", authRouter);
/* ************************************************************************* */

module.exports = router;
