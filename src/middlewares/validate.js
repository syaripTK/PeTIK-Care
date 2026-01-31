const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    if (error) {
      return res.status(400).json({
        message: "Validation error",
        errors: error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      });
    }
  }
};

const validateParams = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.params);

  if (!result.success) {
    return res.status(400).json({
      status: "error",
      message: result.error.flatten().fieldErrors,
    });
  }

  req.params = result.data;
  next();
};

module.exports = { validate, validateParams };
