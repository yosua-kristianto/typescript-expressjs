import {body} from "express-validator";

/**
 * Expected Request
 * 
 * {
 *   "name": "CuaMcacarsaree" // Not Null
 * }
 */
export default [
  body('name')
    .isString().withMessage('Parameter \'name\' not found.')
];