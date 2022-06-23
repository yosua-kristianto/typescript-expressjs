import {body} from "express-validator";

/**
 * Expected Request
 * 
 * {
 *   "param_1": 18, // Not Null
 *   "param_2": 26, // Not Null
 * }
 */
export default [
  body('param_1')
    .isInt().withMessage("Parameter 'param_1' must be present.")
  ,

  body('param_2')
    .isInt().withMessage("Parameter 'param_2' must be present.")
];