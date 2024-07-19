const tables = require("../../database/tables");

const create = async (req, res, next) => {
  const post = req.body;

  try {
    const insertId = await tables.posts.create(post);

    res.status(201).json({ insertId, message: "Bienvenue sur le site" });
  } catch (err) {
    next(err);
  }
};

const readAll = async (req, res, next) => {
  try {
    const post = await tables.posts.readAll();

    res.json(post);
  } catch (err) {
    next(err);
  }
};

const readOneById = async (req, res, next) => {
  try {
    const post = await tables.posts.readOneById(req.params.id);
    if (post == null) {
      res.sendStatus(404);
    } else {
      res.json(post);
    }
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  const post = req.body;

  try {
    const updated = await tables.posts.update(req.params.id, post);
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
    const destroyed = await tables.posts.destroy(req.params.id);

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
