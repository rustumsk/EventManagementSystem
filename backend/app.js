"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var dotenv = require("dotenv");
var app = express();
dotenv.config();
var populate_1 = require("./configs/db/populate");
(0, populate_1.default)();
app.get('/', function (req, res) {
    res.send("Hello!");
});
app.listen(process.env.PORT, function () {
    console.log("Listening at PORT: ".concat(process.env.PORT));
});
