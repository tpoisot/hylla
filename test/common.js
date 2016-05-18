global.chai = require('chai');
global.chai.use(require('chai-fs'));
global.path = require('path');
global.fs = require('fs');

global.shelf = require('../shelf.js');

process.env.NODE_ENV = 'test';
