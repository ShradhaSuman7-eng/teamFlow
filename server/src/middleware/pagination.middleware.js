import AppError from "../utils/AppError.js";

const paginationmiddleware = (req, res, next) => {
  const page = req.query.page ? Number(req.query.page) : 1;
  const limit = req.query.limit ? Number(req.query.limit) : 10;

  if (!Number.isInteger(page) || page < 1) {
    throw new AppError("Page must be a positive integer", 400);
  }

  if (!Number.isInteger(limit) || limit < 1 || limit > 100) {
    throw new Error("Limit must be an integer between 1 and 100", 400);
  }

  req.pagination = {
    page,
    limit,
  };

  next();
};

export default paginationmiddleware;
