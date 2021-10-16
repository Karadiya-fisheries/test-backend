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
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal([
          {
            user_id: "Tharindu",
            fishermen_id: "th@gmail.com",
            lastname: "55555555V",
            age: 44,
          },
          {
            user_id: "Tharindu",
            fishermen_id: "th@gmail.com",
            lastname: "55555555V",
            age: 44,
          },
        ]);
        done();
      });
  });
});
