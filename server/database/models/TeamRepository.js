const AbstractRepository = require("./AbstractRepository");

class TeamRepository extends AbstractRepository {
  constructor() {
    super({ table: "teams" });
  }

  async create(teams) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (team) VALUES (?)`,
      [teams.team]
    );
    return result.insertId;
  }

  async readAll() {
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);
    return rows;
  }

  async readOneById(id) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return rows[0];
  }

  async update(id, team) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET team_name = ? WHERE id = ?`,
      [team, id]
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
module.exports = TeamRepository;
