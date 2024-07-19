const tables = require("../../database/tables");

const create = async (req, res, next) => {
  const player = req.body;

  try {
    const insertId = await tables.players.create(player);

    res.status(201).json({ insertId, message: "Bienvenue sur le site" });
  } catch (err) {
    next(err);
  }
};

const readAll = async (req, res, next) => {
  try {
    const player = await tables.players.readAll();

    res.json(player);
  } catch (err) {
    next(err);
  }
};

const readOneById = async (req, res, next) => {
  try {
    const player = await tables.players.readOneById(req.params.id);
    if (player == null) {
      res.sendStatus(404);
    } else {
      res.json(player);
    }
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  const player = req.body;

  try {
    const updated = await tables.players.update(req.params.id, player);
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
    const destroyed = await tables.players.destroy(req.params.id);

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
