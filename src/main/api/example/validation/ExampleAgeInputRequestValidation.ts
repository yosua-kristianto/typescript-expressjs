import {body} from "express-validator";

/**
 * Expected Request
 * 
 * {
 *   "age": 18 // Not Null
 * }
 */
export default [
  body('age')
    .isInt().withMessage("Parameter 'age' must be present.")
];