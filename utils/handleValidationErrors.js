import { validationResult } from "express-validatior";
export default (req, res, next) => {
  const errors = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json(errors.array());
  }
  next();
};
