import { body } from 'express-validator';

/**
 * Expected multipart/form-data request
 *
 * title: string
 * description: string (optional)
 * document: file (required)
 */
export default [
  body('title')
    .isString().withMessage("Parameter 'title' must be present.")
    .notEmpty().withMessage("Parameter 'title' must not be empty."),

  body('description')
    .optional()
    .isString().withMessage("Parameter 'description' must be a string."),

  body('document')
    .custom((_: unknown, { req }) => {
      if (!req.file) {
        throw new Error("File 'document' must be present.");
      }

      return true;
    })
];