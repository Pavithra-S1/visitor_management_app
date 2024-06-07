const db = require("../services/db_service");
const table = "host_master";

const HostModel = {
    createHost: async (host) => {
        const [rows] = await db.query(`INSERT INTO ${table} SET ?`, host);
        return rows;
    },

    listHosts: async (cond) => {
        const [rows] = await db.query(
            `SELECT * FROM ${table} WHERE ?? LIKE ? ORDER BY ?? ?? LIMIT ? OFFSET ?`,
            [cond.field, `%${cond.search}%`, cond.sort, cond.order, cond.dataLimit, cond.offset]
        );
        return rows;
    },

    getAllHosts: async () => {
        const [rows] = await db.query(`SELECT * FROM ${table}`);
        return rows;
    },

    getHostsCountByCondition: async (cond) => {
        const [rows] = await db.query(
            `SELECT COUNT(host_id) AS totalData FROM ${table} WHERE ?? LIKE ? ORDER BY ?? ??`,
            [cond.field, `%${cond.search}%`, cond.sort, cond.order]
        );
        return rows;
    },

    getHostById: async (id) => {
        const [rows] = await db.query(
            `SELECT * FROM ${table} WHERE host_id = ?`,
            [id]
        );
        return rows;
    },

    getHostByCondition: async (cond) => {
        const [rows] = await db.query(
            `SELECT * FROM ${table} WHERE ${Object.keys(cond)
                .map(() => `?? = ?`)
                .join(" AND ")}`,
            ...Object.entries(cond).flat()
        );
        return rows;
    },

    updateHostById: async (id, update) => {
        const [rows] = await db.query(`UPDATE ${table} SET ? WHERE host_id = ?`, [
            update,
            id,
        ]);
        return rows;
    },

    updateHostByCondition: async (cond, update) => {
        const [rows] = await db.query(
            `UPDATE ${table} SET ? WHERE ${Object.keys(cond)
                .map(() => `?? = ?`)
                .join(" AND ")}`,
            [update, ...Object.entries(cond).flat()]
        );
        return rows;
    },

    deleteHostById: async (id) => {
        const [rows] = await db.query(`DELETE FROM ${table} WHERE host_id = ?`, [id]);
        return rows;
    },

    deleteHostByCondition: async (cond) => {
        const [rows] = await db.query(
            `DELETE FROM ${table} WHERE ${Object.keys(cond)
                .map(() => `?? = ?`)
                .join(" AND ")}`,
            ...Object.entries(cond).flat()
        );
        return rows;
    },
};

module.exports = HostModel;
