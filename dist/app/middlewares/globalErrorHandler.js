'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const envConfig_1 = __importDefault(require('../../config/envConfig'));
const handleValidationError_1 = __importDefault(
  require('../../errors/handleValidationError')
);
const ApiError_1 = __importDefault(require('../../errors/ApiError'));
const zod_1 = require('zod');
const handleZodError_1 = __importDefault(
  require('../../errors/handleZodError')
);
const handleCastError_1 = __importDefault(
  require('../../errors/handleCastError')
);
const envBasedLogger = error => {
  // eslint-disable-next-line
  envConfig_1.default.node_env === 'development'
    ? console.log('Global Error Handler', error)
    : console.log('Global error handler', error);
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const globalErrorHandler = (err, req, res, next) => {
  envBasedLogger(err);
  let statusCode = 500;
  let message = 'Something went wrong';
  let errorMessages = [];
  if (
    (err === null || err === void 0 ? void 0 : err.name) === 'ValidationError'
  ) {
    const error = (0, handleValidationError_1.default)(err);
    statusCode = error.statusCode;
    message = error.message;
    errorMessages = error.errorMessages;
  } else if (err instanceof Error) {
    message = err === null || err === void 0 ? void 0 : err.message;
    errorMessages = (err === null || err === void 0 ? void 0 : err.message)
      ? [
          {
            path: '',
            message: err === null || err === void 0 ? void 0 : err.message,
          },
        ]
      : [];
  } else if (err instanceof ApiError_1.default) {
    statusCode = err === null || err === void 0 ? void 0 : err.statusCode;
    message = err === null || err === void 0 ? void 0 : err.message;
    errorMessages = (err === null || err === void 0 ? void 0 : err.message)
      ? [
          {
            path: '',
            message: err === null || err === void 0 ? void 0 : err.message,
          },
        ]
      : [];
  } else if (err instanceof zod_1.ZodError) {
    const error = (0, handleZodError_1.default)(err);
    statusCode = error.statusCode;
    message = error.message;
    errorMessages = error.errorMessages;
  } else if (
    (err === null || err === void 0 ? void 0 : err.name) === 'CastError'
  ) {
    const simplifiedError = (0, handleCastError_1.default)(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  }
  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack:
      envConfig_1.default.node_env !== 'production'
        ? err === null || err === void 0
          ? void 0
          : err.stack
        : undefined,
  });
};
exports.default = globalErrorHandler;
