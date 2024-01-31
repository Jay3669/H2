export const OPERATION_SUCCESS = (message, result) => ({
  statusCode: 200,
  status: "SUCCESS",
  message,
  result,
});

export const OPERATION_FAILED = (message, result) => ({
  statusCode: 400,
  status: "FAILED",
  message,
  result,
});

