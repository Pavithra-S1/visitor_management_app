const db = require("../services/db_service");
const table = "users";

const UserModel = {
  createUser: async (user) => {
    const [rows] = await db.query(`INSERT INTO ${table} SET ?`, user);
    return rows;
  },
  getAllUsers: async () => {
    const [rows, fields] = await db.query(`SELECT * FROM ${table}`);
    return rows;
  },
  getUserById: async (user_id) => {
    const [rows, fields] = await db.query(
      `SELECT * FROM ${table} WHERE user_id = ?`,
      [user_id]
    );
    return rows;
  },
  getUsersByCondition: async (cond) => {
    const [rows, fields] = await db.query(
      `SELECT * FROM ${table} WHERE ${Object.keys(cond)
        .map((item) => `${item} = '${cond[item]}'`)
        .join(" AND ")}`
    );
    return rows;
  },
  updateUserById: async (user_id, update) =>{
    const [rows] = await db.query(
      `UPDATE ${table} SET ? WHERE user_id = ?`, [update, user_id]
    );
    return rows;
  },
  updateUserByCondition: async (cond, update) =>{
    const [rows] = await db.query(
      `UPDATE ${table} SET ? WHERE ${Object.keys(cond)
        .map((item) => `${item} = '${cond[item]}'`)
        .join(" AND ")}`, [update]
    );
    return rows;
  },
  deleteUserById: async(user_id) =>{
    const [rows] = await db.query(
      `DELETE FROM ${table} WHERE user_id = ?`,
      [user_id]
    );
    return rows;
  },
  deleteUserByCondition: async(cond) =>{
    const [rows] = await db.query(
      `DELETE FROM ${table} WHERE ${Object.keys(cond)
        .map((item) => `${item} = '${cond[item]}'`)
        .join(" AND ")}`
    );
    return rows;
  }
};

module.exports = UserModel;
