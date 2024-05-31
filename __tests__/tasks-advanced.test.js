const { app, request, db, seed, data } = require("../testIndex");
require("jest-sorted");

afterAll(() => {
  return db.end();
});

beforeEach(() => {
  return seed(data);
});

describe("ADVANCED: GET /api/articles (sorting queries)", () => {
  describe("sort_by", () => {
    test("should respond back with sorted articles based on created_at when queried with sort_by, defaults to descending when not passed an order query", () => {
      return request(app)
        .get("/api/articles?sort_by")
        .expect(200)
        .then(({ body }) => {
          expect(body).toBeSortedBy("created_at", { descending: true });
        });
    });

    test("should respond back with sorted articles based on title when queried with sort_by=title, defaults to descending when not passed an order query", () => {
      return request(app)
        .get("/api/articles?sort_by=title")
        .expect(200)
        .then(({ body }) => {
          expect(body).toBeSortedBy("title", { descending: true });
        });
    });

    test("should respond back with sorted articles based on votes when queried with sort_by=votes, defaults to descending when not passed an order query", () => {
      return request(app)
        .get("/api/articles?sort_by=votes")
        .expect(200)
        .then(({ body }) => {
          expect(body).toBeSortedBy("votes", { descending: true });
        });
    });

    test("should respond back with sorted articles based on author when queried with sort_by=author, defaults to descending when not passed an order query", () => {
      return request(app)
        .get("/api/articles?sort_by=author")
        .expect(200)
        .then(({ body }) => {
          expect(body).toBeSortedBy("author", { descending: true });
        });
    });
  });

  describe("ascending order", () => {
    test("should respond back with ascending sorted articles based on created_at when queried with sort_by&order=ASC", () => {
      return request(app)
        .get("/api/articles?sort_by&order=ASC")
        .expect(200)
        .then(({ body }) => {
          expect(body).toBeSortedBy("created_at", { descending: false });
        });
    });

    test("should respond back with ascending sorted articles based on title when queried with sort_by=title&order=ASC", () => {
      return request(app)
        .get("/api/articles?sort_by=title&order=ASC")
        .expect(200)
        .then(({ body }) => {
          expect(body).toBeSortedBy("title", { descending: false });
        });
    });

    test("should respond back with ascending sorted articles based on votes when queried with sort_by=votes&order=ASC", () => {
      return request(app)
        .get("/api/articles?sort_by=votes&order=ASC")
        .expect(200)
        .then(({ body }) => {
          expect(body).toBeSortedBy("votes", { descending: false });
        });
    });

    test("should respond back with ascending sorted articles based on author when queried with sort_by=author&order=ASC", () => {
      return request(app)
        .get("/api/articles?sort_by=author&order=ASC")
        .expect(200)
        .then(({ body }) => {
          expect(body).toBeSortedBy("author", { descending: false });
        });
    });
  });

  describe("descending order", () => {
    test("should respond back with descending sorted articles based on created_at when queried with sort_by&order=DESC", () => {
      return request(app)
        .get("/api/articles?sort_by&order=DESC")
        .expect(200)
        .then(({ body }) => {
          expect(body).toBeSortedBy("created_at", { descending: true });
        });
    });

    test("should respond back with descending sorted articles based on title when queried with sort_by=title&order=DESC", () => {
      return request(app)
        .get("/api/articles?sort_by=title&order=DESC")
        .expect(200)
        .then(({ body }) => {
          expect(body).toBeSortedBy("title", { descending: true });
        });
    });

    test("should respond back with descending sorted articles based on votes when queried with sort_by=votes&order=DESC", () => {
      return request(app)
        .get("/api/articles?sort_by=votes&order=DESC")
        .expect(200)
        .then(({ body }) => {
          expect(body).toBeSortedBy("votes", { descending: true });
        });
    });

    test("should respond back with descending sorted articles based on author when queried with sort_by=author&order=DESC", () => {
      return request(app)
        .get("/api/articles?sort_by=author&order=DESC")
        .expect(200)
        .then(({ body }) => {
          expect(body).toBeSortedBy("author", { descending: true });
        });
    });
  });

  describe("error handling", () => {
    test("should receive a BAD REQUEST error message if query key was not valid", () => {
      return request(app)
        .get("/api/articles?wrongquerykey")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("BAD REQUEST");
        });
    });

    test("should receive a BAD REQUEST error message if query value was not valid", () => {
      return request(app)
        .get("/api/articles?sort_by=invalidSortByValue")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("BAD REQUEST");
        });
    });
  });
});