const responseMiddleware = async (req, res, next) => {
    res.success = (data) => {
      res.status(200).json({
        timestamp: new Date().toISOString(),
        success: true,
        status: 200,
        data,
      });
    };
  
    res.error = (status, message) => {
      res.status(status).json({
        timestamp: new Date().toISOString(),
        success: false,
        status: status,
        error: message
      });
    };
  
    next();
  };
  
  module.exports = responseMiddleware;
  