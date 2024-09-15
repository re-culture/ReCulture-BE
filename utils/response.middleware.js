const responseMiddleware = async (req, res, next) => {
    res.success = (data, pagination) => {
      res.status(200).json({
        timestamp: new Date().toISOString(),
        success: true,
        status: 200,
        data,
        pagination
      });
    };
  
    res.error = (status, message, detail) => {
      res.status(status).json({
        timestamp: new Date().toISOString(),
        success: false,
        status: status,
        error: message,
        detail: detail
      });
    };
  
    next();
  };
  
  module.exports = responseMiddleware;
  