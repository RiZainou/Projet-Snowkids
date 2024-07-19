const tables = require("../../database/tables");

const create = async (req, res, next) => {
  const role = req.body;

  try {
    const insertId = await tables.roles.create(role);

    res.status(201).json({ insertId, message: "Bienvenue sur le site" });
  } catch (err) {
    next(err);
  }
};

const readAll = async (req, res, next) => {
  try {
    const role = await tables.roles.readAll();

    res.json(role);
  } catch (err) {
    next(err);
  }
};

const readOneById = async (req, res, next) => {
  try {
    const role = await tables.roles.readOneById(req.params.id);
    if (role == null) {
      res.sendStatus(404);
    } else {
      res.json(role);
    }
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  const role = req.body;

  try {
    const updated = await tables.roles.update(req.params.id, role);
    if (updated) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    next(e);
  }
};

const destroy = async (req, res, next) => {
  try {
    const destroyed = await tables.roles.destroy(req.params.id);

    if (destroyed) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    next(e);
  }
};

module.exports = {
  create,
  readAll,
  readOneById,
  update,
  destroy,
};
