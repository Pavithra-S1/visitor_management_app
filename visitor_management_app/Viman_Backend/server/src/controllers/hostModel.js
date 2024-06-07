const HostModel = require("../models/hostModel");
const { validationResult } = require("express-validator");
const qs = require("querystring");
const Response = require("../helpers/response");
const { APP_URL, LIMIT_DATA } = process.env;

const HostController = {

    createHost: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return Response.responseStatus(res, 400, "Validation Failed", errors);
            }
            const {
                emp_code,
                name,
                email,
                phone,
                department,
                availability,
                createdBy,
            } = req.body;

            const hostData = {
                emp_code,
                name,
                email,
                phone,
                department,
                availability,
                created_by: createdBy,
                modified_by: createdBy,
            };

            const result = await HostModel.createHost(hostData);
            if (result.insertId > 0) {
                return Response.responseStatus(res, 201, `Host created successfully`);
            }
            return Response.responseStatus(res, 400, `Failed to create host`);
        } catch (error) {
            return Response.responseStatus(res, 500, "Internal server error", {
                error: error.message,
            });
        }
    },

    listHosts: async (req, res) => {
        try {
            const cond = { ...req.query };
            cond.field = cond.field || "host_id";
            cond.search = cond.search || "";
            cond.page = Number(cond.page) || 1;
            cond.limit = Number(cond.limit) || Number(LIMIT_DATA);
            cond.dataLimit = cond.limit;
            cond.offset = (cond.page - 1) * cond.limit;
            cond.sort = cond.sort || "host_id";
            cond.order = cond.order || "ASC";

            const pageInfo = {
                nextLink: null,
                prevLink: null,
                totalData: 0,
                totalPage: 0,
                currentPage: 0,
            };

            const countData = await HostModel.getHostsCountByCondition(cond);
            pageInfo.totalData = countData[0].totalData;
            pageInfo.totalPage = Math.ceil(pageInfo.totalData / cond.limit);
            pageInfo.currentPage = cond.page;

            const nextQuery = qs.stringify({
                ...req.query,
                page: cond.page + 1,
            });
            const prevQuery = qs.stringify({
                ...req.query,
                page: cond.page - 1,
            });
            pageInfo.nextLink =
                cond.page < pageInfo.totalPage
                    ? APP_URL.concat(`/api/hosts?${nextQuery}`)
                    : null;
            pageInfo.prevLink =
                cond.page > 1 ? APP_URL.concat(`/api/hosts?${prevQuery}`) : null;

            const results = await HostModel.listHosts(cond);

            if (results.length > 0) {
                return Response.responseStatus(
                    res,
                    200,
                    "List of all Hosts",
                    results,
                    pageInfo
                );
            }
            return Response.responseStatus(res, 400, "No data found");
        } catch (error) {
            return Response.responseStatus(res, 500, "Internal server error", {
                error: error.message,
            });
        }
    },

    getAllHosts: async (req, res) => {
        try {
            const rows = await HostModel.getAllHosts();
            if (rows.length > 0) {
                return Response.responseStatus(
                    res,
                    200,
                    "List of all Hosts",
                    rows
                );
            }
            return Response.responseStatus(res, 400, "No data found");
        } catch (error) {
            return Response.responseStatus(res, 500, "Internal server error", {
                error: error.message,
            });
        }
    },

    getHostById: async (req, res) => {
        const host_id = req.params.host_id;
        try {
            const result = await HostModel.getHostByCondition({ host_id });
            if (result.length > 0) {
                return Response.responseStatus(
                    res,
                    200,
                    `Details of Host(${host_id})`,
                    result
                );
            }
            return Response.responseStatus(
                res,
                400,
                `No data found for ${host_id}`
            );
        } catch (error) {
            return Response.responseStatus(res, 500, "Internal server error", {
                error: error.message,
            });
        }
    },

    updateHostById: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return Response.responseStatus(res, 400, "Validation Failed", errors);
            }
            const host_id = req.params.host_id;
            const {
                emp_code,
                name,
                email,
                phone,
                department,
                availability,
                modifiedBy,
            } = req.body;

            const hostData = {
                emp_code,
                name,
                email,
                phone,
                department,
                availability,
                modified_by: modifiedBy,
            };

            const result = await HostModel.updateHostByCondition({ host_id }, hostData);

            if (result.affectedRows > 0) {
                return Response.responseStatus(
                    res,
                    200,
                    "Host updated successfully"
                );
            }
            return Response.responseStatus(res, 400, `Failed to update Host`);
        } catch (error) {
            return Response.responseStatus(res, 500, "Internal server error", {
                error: error.message,
            });
        }
    },

    deleteHostById: async (req, res) => {
        try {
            const host_id = req.params.host_id;
            const result = await HostModel.deleteHostByCondition({ host_id });

            if (result.affectedRows > 0) {
                return Response.responseStatus(res, 200, `Host deleted successfully`);
            }
            return Response.responseStatus(res, 404, `Failed to delete Host`);
        } catch (error) {
            return Response.responseStatus(res, 500, "Internal server error", {
                error: error.message,
            });
        }
    },
};

module.exports = HostController;
