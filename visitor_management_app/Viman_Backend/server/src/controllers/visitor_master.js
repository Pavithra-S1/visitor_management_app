    const VisitorModel = require("../models/visitor_master");
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
            name,
            email,
            phone,
            photo,
            companyName,
            companyLocation,
            idProof,
            aadharCard,
            voterId,
            panCard,
            drivingLicense,
            others,
            isVerified,
            createdBy,
        } = req.body;

        const visitorData = {
            name,
            email,
            phone,
            photo,
            company_name: companyName,
            company_location: companyLocation,
            id_proof: idProof,
            aadhar_card: aadharCard,
            voter_id: voterId,
            pan_card: panCard,
            driving_license: drivingLicense,
            others,
            is_verified: isVerified,
            created_by: createdBy,
            modified_by: createdBy,
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
        cond.field = cond.field || "visitor_id";
        cond.search = cond.search || "";
        cond.page = Number(cond.page) || 1;
        cond.limit = Number(cond.limit) || Number(LIMIT_DATA);
        cond.dataLimit = cond.limit;
        cond.offset = (cond.page - 1) * cond.limit;
        cond.sort = cond.sort || "visitor_id";
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
        const visitor_id = req.params.visitor_id;
        try {
        const result = await VisitorModel.getVisitorByCondition({
            visitor_id,
        });
        if (result.length > 0) {
            return Response.responseStatus(
            res,
            200,
            `Details of Visitor(${visitor_id})`,
            result
            );
        }
        return Response.responseStatus(
            res,
            400,
            `No data found for ${visitor_id}`
        );
        } catch (error) {
        return Response.responseStatus(res, 500, "Internal server error", {
            error: error.message,
        });
        }
    },

    getVisitorByPhone: async (req, res) => {
        const phone = req.params.phone;
        try {
            const result = await VisitorModel.getVisitorByPhone(phone);
            if (result.length > 0) {
                return Response.responseStatus(
                    res,
                    200,
                    `Visitor(s) with phone number ${phone}`,
                    result
                );
            }
            return Response.responseStatus(
                res,
                400,
                `No visitor found with phone number ${phone}`
            );
        } catch (error) {
            return Response.responseStatus(res, 500, "Internal server error", {
                error: error.message,
            });
        }
    },

    getVisitorByEmail: async (req, res) => {
        const email = req.params.email;
        try {
            const result = await VisitorModel.getVisitorByEmail(email);
            if (result.length > 0) {
                return Response.responseStatus(
                    res,
                    200,
                    `Visitor(s) with email ${email}`,
                    result
                );
            }
            return Response.responseStatus(
                res,
                400,
                `No visitor found with email ${email}`
            );
        } catch (error) {
            return Response.responseStatus(res, 500, "Internal server error", {
                error: error.message,
            });
        }
    },

    getVisitorByName: async (req, res) => {
        const name = req.params.name;
        try {
            const result = await VisitorModel.getVisitorByName(name);
            if (result.length > 0) {
                return Response.responseStatus(
                    res,
                    200,
                    `Visitor(s) with name ${name}`,
                    result
                );
            }
            return Response.responseStatus(
                res,
                400,
                `No visitor found with name ${name}`
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

            const visitor_id = req.params.visitor_id;
            const updateData = req.body; // Data sent by the user for update

            // Constructing the update object dynamically
            const updateObject = {};
            for (const key in updateData) {
                if (Object.hasOwnProperty.call(updateData, key)) {
                    updateObject[key] = updateData[key];
                }
            }

            const result = await VisitorModel.updateVisitorById(visitor_id, updateObject);

            if (result.affectedRows > 0) {
                return Response.responseStatus(res, 200, "Visitor updated successfully");
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
        const visitor_id = req.params.visitor_id;
        const result = await VisitorModel.deleteVisitorByCondition({ visitor_id });

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
