const app = require("../../server/index.js");
const supertest = require("supertest");
const request = supertest(app);
// jest.setTimeout(70000);
// jest.setTimeout(600000);
// jest.useRealTimers();

describe("test server", function () {
  jest.setTimeout(600000);
  it("gets the test endpoint", async (done) => {
    const res = await request.get("/testEndpoint");
    // expect(res.status)
    //   // .expect(200)
    //   // .expect("Content-Type", "application/json")
    //   // .expect(/{"message":".*","status":"success"}/, done);
    //   .toBe(200)
    //   .expect("Content-Type", "application/json")
    //   .expect(/{"message":".*","status":"success"}/, done);
    expect(res.body.message).toBe("The endpoint test passed!");
    // done();
  });
});

// describe('Random Dog Image', function() {
//   it('responds with expected JSON structure', function(done) {
//     request('https://dog.ceo')
//       .get('/api/breeds/image/random')
//       .expect(200)
//       .expect('Content-Type', 'application/json')
//       .expect(/{"message":".*","status":"success"}/, done);
//   });
// });
