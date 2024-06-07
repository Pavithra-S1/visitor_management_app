const VisitorModel = require("../models/visitor");
const { validationResult } = require("express-validator");
const qs = require("querystring");
const Response = require("../helpers/response");
const { APP_URL, LIMIT_DATA } = process.env;

const VisitorController = {
    
    createVisitor: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return Response.responseStatus(res, 400, "Validation Failed", errors);
            }
            const {
                visitor_id,
                host_id,
                floor,
                visitor_card_no,
                purpose_of_visit,
                comment,
                status,
                visitor_token,
                visitor_pass,
                visitor_is_verifited,
                date,
                created_by,
            } = req.body;

            const visitorData = {
                visitor_id,
                host_id,
                floor,
                visitor_card_no,
                purpose_of_visit,
                comment,
                status,
                visitor_token,
                visitor_pass,
                visitor_is_verifited,
                date,
                check_in: new Date(),
                check_out: new Date(),
                created_by,
                modified_by: created_by,
            };

            const result = await VisitorModel.createVisitor(visitorData);
            if (result.insertId > 0) {
                return Response.responseStatus(res, 201, `Visitor created successfully`);
            }
            return Response.responseStatus(res, 400, `Failed to create visitor`);
        } catch (error) {
            return Response.responseStatus(res, 500, "Internal server error", {
                error: error.message,
            });
        }
    },

    listVisitors: async (req, res) => {
        try {
            const cond = { ...req.query };
            cond.field = cond.field || "id";
            cond.search = cond.search || "";
            cond.page = Number(cond.page) || 1;
            cond.limit = Number(cond.limit) || Number(LIMIT_DATA);
            cond.dataLimit = cond.limit;
            cond.offset = (cond.page - 1) * cond.limit;
            cond.sort = cond.sort || "id";
            cond.order = cond.order || "ASC";

            const pageInfo = {
                nextLink: null,
                prevLink: null,
                totalData: 0,
                totalPage: 0,
                currentPage: 0,
            };

            const countData = await VisitorModel.getVisitorsCountByCondition(cond);
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
                ? APP_URL.concat(`/api/visitors?${nextQuery}`)
                : null;
            pageInfo.prevLink =
                cond.page > 1 ? APP_URL.concat(`/api/visitors?${prevQuery}`) : null;

            const results = await VisitorModel.listVisitors(cond);

            if (results.length > 0) {
                return Response.responseStatus(
                    res,
                    200,
                    "List of all Visitors",
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

    getAllVisitors: async (req, res) => {
        try {
            const rows = await VisitorModel.getAllVisitors();
            if (rows.length > 0) {
                return Response.responseStatus(
                    res,
                    200,
                    "List of all Visitors",
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

    getVisitorById: async (req, res) => {
        const id = req.params.id;
        try {
            const result = await VisitorModel.getVisitorByCondition({ id });
            if (result.length > 0) {
                return Response.responseStatus(
                    res,
                    200,
                    `Details of Visitor(${id})`,
                    result
                );
            }
            return Response.responseStatus(
                res,
                400,
                `No data found for ${id}`
            );
        } catch (error) {
            return Response.responseStatus(res, 500, "Internal server error", {
                error: error.message,
            });
        }
    },

    updateVisitorById: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return Response.responseStatus(res, 400, "Validation Failed", errors);
            }
            const id = req.params.id;
            const {
                visitor_id,
                host_id,
                floor,
                visitor_card_no,
                purpose_of_visit,
                comment,
                status,
                visitor_token,
                visitor_pass,
                visitor_is_verifited,
                date,
                modified_by,
            } = req.body;

            const visitorData = {
                visitor_id,
                host_id,
                floor,
                visitor_card_no,
                purpose_of_visit,
                comment,
                status,
                visitor_token,
                visitor_pass,
                visitor_is_verifited,
                date,
                check_out: new Date(),
                modified_by,
            };

            const result = await VisitorModel.updateVisitorByCondition(
                { id },
                visitorData
            );

            if (result.affectedRows > 0) {
                return Response.responseStatus(
                    res,
                    200,
                    "Visitor updated successfully"
                );
            }
            return Response.responseStatus(res, 400, `Failed to update Visitor`);
        } catch (error) {
            return Response.responseStatus(res, 500, "Internal server error", {
                error: error.message,
            });
        }
    },

    deleteVisitorById: async (req, res) => {
        try {
            const id = req.params.id;
            const result = await VisitorModel.deleteVisitorByCondition({ id });

            if (result.affectedRows > 0) {
                return Response.responseStatus(res, 200, `Visitor deleted successfully`);
            }
            return Response.responseStatus(res, 404, `Failed to delete Visitor`);
        } catch (error) {
            return Response.responseStatus(res, 500, "Internal server error", {
                error: error.message,
            });
        }
    },
};

module.exports = VisitorController;
