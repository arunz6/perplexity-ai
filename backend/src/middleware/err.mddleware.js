async function errhandler(err, req, res, next) {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    err: err,
    errproblem: err.stack,
  });
}

export default errhandler;
