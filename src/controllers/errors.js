// controllers/errors.js

// This controller triggers a test error to demonstrate the app's global error handling.
const testErrorPage = (req, res, next) => {
  const err = new Error('This is a test error');
  err.status = 500;
  next(err);
};

// This controller creates a 404 error when a requested page is not found.
const handle404 = (req, res, next) => {
  const err = new Error('Page Not Found');
  err.status = 404;
  next(err);
};

// Export the error handlers so Express can use them.
export { testErrorPage, handle404 };
