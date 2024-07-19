const AbstractRepository = require("./AbstractRepository");

class UserRepository extends AbstractRepository {
  constructor() {
    super({ table: "users" });
  }

  async create(user) {
    const { firstname, lastname, email, password, roleId } = user;
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (firstname, lastname, email, password, role_id) VALUES (?, ?, ?, ?, 1)`,
      [firstname, lastname, email, password, roleId]
    );
    return result.insertId;
  }

  async readAll() {
    const [rows] = await this.database.query(
      `SELECT 
        u.firstname, u.lastname, u.email, u.password, 
        r.role as role_name 
      FROM ${this.table} AS u
      JOIN roles AS r ON u.role_id = r.id`
    );
    return rows;
  }

  async readOneById(id) {
    const [rows] = await this.database.query(
      `SELECT u.firstname, u.lastname, u.email, u.password, r.role as role_name FROM ${this.table} AS u JOIN roles AS r ON u.role_id = r.id WHERE u.id = ?`,
      [id]
    );
    return rows[0];
  }

  async update(id, user) {
    const [firstname, lastname, email, password, roleId] = user;
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET firstname = ?, lastname = ?, email = ?, password = ?, role_id = ?  WHERE users_id = ?`,
      [firstname, lastname, email, password, roleId, id]
    );
    return result.affectedRows > 0;
  }

  async destroy(id) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE users_id = ?`,
      [id]
    );
    return result.affectedRows > 0;
  }

  async findUserByEmail(email) {
    const [result] = await this.database.query(
      `SELECT firstname, password FROM ${this.table} WHERE email = ?`,
      [email]
    );

    return result;
  }
}
module.exports = UserRepository;
