"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logger_1 = __importDefault(require("./utils/logger"));
const user_handler_1 = require("./handler/user_handler");
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.post('/users', user_handler_1.createUser);
app.get('/users', user_handler_1.getUser);
app.listen(port, () => {
    logger_1.default.info(`Server berjalan di http://localhost:${port}`);
});
