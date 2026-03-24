"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notification_service_1 = require("./notification.service");
const router = (0, express_1.Router)();
router.post('/dispatch', async (req, res, next) => {
    try {
        await notification_service_1.notificationService.dispatchNotifications();
        res.status(204).end();
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
