const supertest = require("supertest");
const chai = require("chai");
const sinonChai = require("sinon-chai");
const app = require("../index");
const { expect } = require("chai");

chai.use(sinonChai);
server = supertest.agent(app);
BASE_URL = "/fishermen";

describe("Index page test", () => {
  it("gets base url", (done) => {
    server
      .get("/fishermen")
      .expect(404)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal("<h1>Fishermen</h1>");
        done();
      });
  });
});
