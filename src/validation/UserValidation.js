const { check } = require("express-validator");
// Validation middleware for creating/updating users
const validateUser = [
  check("full_name").notEmpty().withMessage("Full name is required"),
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email"),
  check("phone")
    .notEmpty()
    .withMessage("Phone number is required")
    .isMobilePhone()
    .withMessage("Invalid phone number"),
];

module.exports = {
  validateUser
};
