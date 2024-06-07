const db = require("../services/db_service");
const table = "visitors";

const VisitorModel = {
    createVisitor: async (visitor) => {
        const [rows] = await db.query(`INSERT INTO ${table} SET ?`, visitor);
        return rows;
    },

    listVisitors: async (cond) => {
        const [rows] = await db.query(
            `SELECT * FROM ${table} WHERE ?? LIKE ? ORDER BY ?? ?? LIMIT ? OFFSET ?`,
            [cond.field, `%${cond.search}%`, cond.sort, cond.order, cond.dataLimit, cond.offset]
        );
        return rows;
    },

    getAllVisitors: async () => {
        const [rows] = await db.query(`SELECT * FROM ${table}`);
        return rows;
    },

    getVisitorsCountByCondition: async (cond) => {
        const [rows] = await db.query(
            `SELECT COUNT(id) AS totalData FROM ${table} WHERE ?? LIKE ? ORDER BY ?? ??`,
            [cond.field, `%${cond.search}%`, cond.sort, cond.order]
        );
        return rows;
    },

    getVisitorById: async (id) => {
        const [rows] = await db.query(
            `SELECT * FROM ${table} WHERE id = ?`,
            [id]
        );
        return rows;
    },

    getVisitorByCondition: async (cond) => {
        const [rows] = await db.query(
            `SELECT * FROM ${table} WHERE ${Object.keys(cond)
                .map(() => `?? = ?`)
                .join(" AND ")}`,
            ...Object.entries(cond).flat()
        );
        return rows;
    },

    updateVisitorById: async (id, update) => {
        const [rows] = await db.query(`UPDATE ${table} SET ? WHERE id = ?`, [
            update,
            id,
        ]);
        return rows;
    },

    updateVisitorByCondition: async (cond, update) => {
        const [rows] = await db.query(
            `UPDATE ${table} SET ? WHERE ${Object.keys(cond)
                .map(() => `?? = ?`)
                .join(" AND ")}`,
            [update, ...Object.entries(cond).flat()]
        );
        return rows;
    },

    deleteVisitorById: async (id) => {
        const [rows] = await db.query(`DELETE FROM ${table} WHERE id = ?`, [id]);
        return rows;
    },

    deleteVisitorByCondition: async (cond) => {
        const [rows] = await db.query(
            `DELETE FROM ${table} WHERE ${Object.keys(cond)
                .map(() => `?? = ?`)
                .join(" AND ")}`,
            ...Object.entries(cond).flat()
        );
        return rows;
    },
};

module.exports = VisitorModel;
