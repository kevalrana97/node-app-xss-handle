const express = require("express");
const router = express.Router();
const { validationResult } = require("express-validator");
const dbConnection = require("@utils/dbConnection.js");
const db = dbConnection();
const sanitizeHtml = require("sanitize-html");
const { validateUser } = require("@validation/UserValidation");
const { handleErrorResponse, handleDatabaseResponse } = require("@utils/helper");


// Middleware for sanitizing input
const sanitizeInput = (req, res, next) => {
  req.body.full_name = sanitizeHtml(req.body.full_name);
  req.body.email = sanitizeHtml(req.body.email);
  req.body.phone = sanitizeHtml(req.body.phone);
  next();
};


// User CRUD Operations APIs

// List Users without Pagination
router.get("/users", (req, res) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, results) => handleDatabaseResponse(err, results, "User data fetched successfully", "Failed to fetch user list", res));
});


// Fetch a single user by ID
router.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  const sql = "SELECT * FROM users WHERE id = ?";
  db.query(sql, [userId], (err, results) => {
    handleDatabaseResponse(err, results, "User data fetched successfully", "User not found", res)
  })
});



// Create User
router.post("/users", sanitizeInput, validateUser, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return handleErrorResponse(errors, res);

  const { full_name, email, phone } = req.body;
  const sql = "INSERT INTO users (full_name, email, phone) VALUES (?, ?, ?)";
  db.query(sql, [full_name, email, phone], (err, result) => handleDatabaseResponse(err, result, "User created successfully", "Failed to create user", res));
});

// Update User
router.put("/users/:id", sanitizeInput, validateUser, (req, res) => {
  const { id } = req.params;
  const errors = validationResult(req);
  if (!errors.isEmpty()) return handleErrorResponse(errors, res);

  const { full_name, email, phone } = req.body;
  const sql = "UPDATE users SET full_name=?, email=?, phone=? WHERE id=?";
  db.query(sql, [full_name, email, phone, id], (err, result) => handleDatabaseResponse(err, result, "User updated successfully", "Failed to update user", res));
});

// Delete User
router.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM users WHERE id=?";
  db.query(sql, [id], (err, result) => handleDatabaseResponse(err, result, "User deleted successfully", "Failed to delete user", res));
});

module.exports = router;
