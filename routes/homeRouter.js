const express = require('express');
const { addBlockController } = require('../controller/addBlockController');

const homeRoute = express.Router();




homeRoute.post('/addBlock',addBlockController);





exports.homeRoute = homeRoute