// Load modules below.
const express = require('express');
const session = require('express-session');
const MongoDBSession = require('connect-mongodb-session')(session);
const bcrypt = require('bcrypt');
const saltRounds = 12;
const Joi = require('joi');
const url = require('url');
const router = express.Router();

module.exports = { express, session, MongoDBSession, bcrypt, saltRounds, Joi, router, url };