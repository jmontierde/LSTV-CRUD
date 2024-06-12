import express from "express";

import {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employee.controller.js";

const router = express.Router();

router.post("/employees", createEmployee);
router.get("/employees", getEmployees);
router.get("/employees/:id", getEmployeeById);
router.put("/employees/:id", updateEmployee);
router.delete("/employees/:id", deleteEmployee);

export default router;
