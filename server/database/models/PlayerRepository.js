const AbstractRepository = require("./AbstractRepository");

class PlayerRepository extends AbstractRepository {
  constructor() {
    super({ table: "players" });
  }

  async create(player) {
    const [firstname, lastname, status, postId, teamId] = player;
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (firstname, lastname, status, posts_id, teams_id) VALUES (?, ?, ?, ?, ?)`,
      [firstname, lastname, status, postId, teamId]
    );
    return result.insertId;
  }

  async readAll() {
    const [rows] = await this.database.query(
      `SELECT p.firstname, p.lastname, p.status, ps.post as posts_post, t.team as teams_team FROM ${this.table} p JOIN posts ps ON p.posts_id = ps.id JOIN teams t ON p.teams_id = t.id`
    );
    return rows;
  }

  async readOneById(id) {
    const [rows] = await this.database.query(
      `SELECT p.firstname, p.lastname, p.status, ps.post as posts_post, t.team as teams_team FROM ${this.table} p JOIN posts ps ON p.posts_id = ps.id JOIN teams t ON p.teams_id = t.id WHERE p.id = ?`,
      [id]
    );
    return rows[0];
  }

  async update(id, player) {
    const [firstname, lastname, status, postId, teamId] = player;
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET firstname = ?, lastname = ?, status = ?, posts_id = ?, teams_id = ? WHERE id = ?`,
      [firstname, lastname, status, postId, teamId, id]
    );
    return result.affectedRows > 0;
  }

  async destroy(id) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return result.affectedRows > 0;
  }
}

module.exports = PlayerRepository;
