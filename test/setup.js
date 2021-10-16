const supertest = require("supertest");
const chai = require("chai");
const sinonChai = require("sinon-chai");
const app = require("../index");

chai.use(sinonChai);
exports.expect = chai;
exports.server = supertest.agent(app);
exports.BASE_URL = "/fishermen";
