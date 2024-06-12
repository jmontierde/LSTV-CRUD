// EmployeeRead.tsx
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { readEmployees, deleteEmployee } from "./employeeSlice";
import { Button, Table } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";

const EmployeeRead = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { employees } = useAppSelector((state) => state.employee);

  useEffect(() => {
    dispatch(readEmployees());
  }, [dispatch]);

  const employeHeader = [
    "Recid",
    "Fullname",
    "Address",
    "Birthdate",
    "Age",
    "Gender",
    "Civil Status",
    "Contact Number",
    "Salary",
    "Active",
    "Actions",
  ];

  const handleEdit = (id: string) => {
    navigate(`/employees/edit/${id}`);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteEmployee(id));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Format date as per locale
  };

  return (
    <div className="mx-12 my-6">
      <Button onClick={() => navigate("/")}>Add Employee</Button>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            {employeHeader.map((empHeader, index) => (
              <Table.ColumnHeaderCell key={index}>
                {empHeader}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {employees.map((employee, index) => (
            <Table.Row key={employee.recid}>
              <Table.RowHeaderCell>{index + 1}</Table.RowHeaderCell>
              <Table.RowHeaderCell>{employee.fullname}</Table.RowHeaderCell>
              <Table.RowHeaderCell>{employee.address}</Table.RowHeaderCell>
              <Table.RowHeaderCell>
                {formatDate(employee.birthdate)}
              </Table.RowHeaderCell>{" "}
              {/* Format birthdate */}
              <Table.RowHeaderCell>{employee.age}</Table.RowHeaderCell>
              <Table.RowHeaderCell>{employee.gender}</Table.RowHeaderCell>
              <Table.RowHeaderCell>{employee.civilstat}</Table.RowHeaderCell>
              <Table.RowHeaderCell>{employee.contactnum}</Table.RowHeaderCell>
              <Table.RowHeaderCell>{employee.salary}</Table.RowHeaderCell>
              <Table.RowHeaderCell>
                {employee.isactive ? (
                  <Button>True</Button>
                ) : (
                  <Button>False</Button>
                )}
              </Table.RowHeaderCell>
              <Table.RowHeaderCell>
                <div className="flex justify-center items-center space-x-3">
                  <Button onClick={() => handleEdit(employee.recid)}>
                    Edit
                  </Button>
                  <Button
                    color="red"
                    onClick={() => handleDelete(employee.recid)}
                  >
                    Delete
                  </Button>
                </div>
              </Table.RowHeaderCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default EmployeeRead;
