
// import { Response } from "express";
export const createErrorMessage = (message, status) => {
  console.log(message, status);
  throw {
    message,
    status,
  };
};
export const sendErrorResponse = (err, res) => {
  console.log(err);
  const status = err.status || 500;
  err = err.message || "Something Went Wrong";
  return res.status(status).json({
    message: err,
  });
};