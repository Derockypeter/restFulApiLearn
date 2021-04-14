require('should');

const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Book = moongoose.model('Book');
const agent = request.agent(app);