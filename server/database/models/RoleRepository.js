const AbstractRepository = require("./AbstractRepository");

class RoleRepository extends AbstractRepository {
  constructor() {
    super({ table: "roles" });
  }

  async create(roles) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (role) VALUES (?)`,
      [roles.role]
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

  async update(id, role) {
    const roleName = role;
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET role = ? WHERE id = ?`,
      [roleName, id]
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

module.exports = RoleRepository;
