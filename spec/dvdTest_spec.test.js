let request = require("request");

const baseURL = "http://localhost:3030/dvd/";

console.log("Starting dvd_test.js");

describe("Test server for DVDs", () => {
  describe("GET /team", () => {
    it("returns Team Name & Members", (done) => {
      request.get(baseURL + "team", (err, resp, body) => {
        teamData = JSON.parse(body);
        expect(teamData.team).toBe("DVC Team");
        expect(teamData.membersNames[0]).toBe("Harish");
        expect(teamData.membersNames[1]).toBe("Srujan");
        done();
      });
    });
  });

  describe("GET /all", () => {
    it("returns all the DVDs", (done) => {
      request.get(baseURL + "all", (err, resp, body) => {
        dvdData = JSON.parse(body);
        expect(dvdData[0].productName).toBe("The Shawshank Redemption");
        expect(dvdData.length).toBeGreaterThan(0);
        done();
      });
    });
  });

  describe("GET /all/IN", () => {
    it("checks the tax percentage in India", (done) => {
      request.get(baseURL + "all/IN", (err, resp, body) => {
        dvdData = JSON.parse(body);
        expect(dvdData[0].taxPercentage).toBe(18);
        done();
      });
    });
  });

  describe("GET /all/IN", () => {
    it("checks the tax percentage and product price in India", (done) => {
      request.get(baseURL + "all/IN", (err, resp, body) => {
        dvdData = JSON.parse(body);
        expect(dvdData[0].taxPercentage).toBe(18);
        expect(dvdData[0].price).toBe(17.7);
        done();
      });
    });
  });

  describe("GET /all/IE", () => {
    it("checks the tax percentage and product price in Ireland", (done) => {
      request.get(baseURL + "all/IE", (err, resp, body) => {
        dvdData = JSON.parse(body);
        expect(dvdData[0].taxPercentage).toBe(23);
        expect(dvdData[0].price).toBe(18.45);
        done();
      });
    });
  });

  describe("GET /all/US-NC", () => {
    it("checks the tax percentage and product price in North Carolina,US", (done) => {
      request.get(baseURL + "all/US-NC", (err, resp, body) => {
        dvdData = JSON.parse(body);
        expect(dvdData[0].taxPercentage).toBe(8);
        expect(dvdData[0].price).toBe(16.2);
        done();
      });
    });
  });

  describe("GET /search?", () => {
    it("checks the filters for searching the products", (done) => {
      request.get(
        baseURL + "search?minprice=10&maxprice=20",
        (err, resp, body) => {
          dvdData = JSON.parse(body);
          expect(dvdData.length).toBeGreaterThan(0);
          done();
        }
      );
    });
  });
});