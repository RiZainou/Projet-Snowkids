const tables = require("../../database/tables");

const create = async (req, res, next) => {
  const team = req.body;

  try {
    const insertId = await tables.teams.create(team);

    res.status(201).json({ insertId, message: "Bienvenue sur le site" });
  } catch (err) {
    next(err);
  }
};

const readAll = async (req, res, next) => {
  try {
    const team = await tables.teams.readAll();

    res.json(team);
  } catch (err) {
    next(err);
  }
};

const readOneById = async (req, res, next) => {
  try {
    const team = await tables.teams.readOneById(req.params.id);
    if (team == null) {
      res.sendStatus(404);
    } else {
      res.json(team);
    }
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  const team = req.body;

  try {
    const updated = await tables.teams.update(req.params.id, team);
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
    const destroyed = await tables.teams.destroy(req.params.id);

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
