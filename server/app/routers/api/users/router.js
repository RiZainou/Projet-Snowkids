const express = require("express");

const router = express.Router();

const {
  create,
  readAll,
  readOneById,
  update,
  destroy,
} = require("../../../controllers/usersAction");
const validateUser = require("../../../services/validation/userValidation");
const hashPassword = require("../../../services/hashPassword");

router.post("/", validateUser, hashPassword, create);

router.get("/", readAll);

router.get("/:id", readOneById);

router.put("/:id", update);

router.delete("/:id", destroy);

module.exports = router;
