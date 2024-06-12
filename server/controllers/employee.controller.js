import prisma from "../lib/prisma.js";
// Create a new employee
export const createEmployee = async (req, res) => {
  const {
    fullname,
    address,
    birthdate,
    age,
    gender,
    civilstat,
    contactnum,
    salary,
    isactive,
  } = req.body;

  try {
    const newEmployee = await prisma.employee.create({
      data: {
        fullname,
        address,
        birthdate: new Date(birthdate),
        age,
        gender,
        civilstat,
        contactnum,
        salary,
        isactive,
      },
    });

    res.status(201).json(newEmployee);
  } catch (error) {
    console.error("Error creating employee:", error);
    res.status(500).json({ message: "Failed to create employee" });
  }
};

// Get all employees
export const getEmployees = async (req, res) => {
  try {
    const employees = await prisma.employee.findMany();
    res.status(200).json(employees);
  } catch (error) {
    console.error("Error retrieving employees:", error);
    res.status(500).json({ message: "Failed to retrieve employees" });
  }
};

// Get an employee by ID
export const getEmployeeById = async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await prisma.employee.findUnique({
      where: { recid: id },
    });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json(employee);
  } catch (error) {
    console.error("Error retrieving employee:", error);
    res.status(500).json({ message: "Failed to retrieve employee" });
  }
};

// Update an employee
export const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const {
    fullname,
    address,
    birthdate,
    age,
    gender,
    civilstat,
    contactnum,
    salary,
    isactive,
  } = req.body;

  try {
    const updatedEmployee = await prisma.employee.update({
      where: { recid: id },
      data: {
        fullname,
        address,
        birthdate: new Date(birthdate),
        age,
        gender,
        civilstat,
        contactnum,
        salary,
        isactive,
      },
    });

    res.status(200).json(updatedEmployee);
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({ message: "Failed to update employee" });
  }
};

// Delete an employee
export const deleteEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.employee.delete({
      where: { recid: id },
    });

    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ message: "Failed to delete employee" });
  }
};
