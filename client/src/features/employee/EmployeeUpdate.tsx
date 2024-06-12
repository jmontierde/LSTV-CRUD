// EmployeeUpdate.tsx
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { useNavigate, useParams } from "react-router-dom"; // Import useParams hook
import { readEmployees } from "./employeeSlice";
import EmployeeForm from "./EmployeeForm";

const EmployeeUpdate = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams(); // Access route parameters
  const { employees } = useAppSelector((state) => state.employee);
  const employeeToUpdate = employees.find((emp) => emp.recid === id);

  useEffect(() => {
    dispatch(readEmployees());
  }, [dispatch, navigate]);

  return (
    <div className="mx-12 my-6">
      Hello World
      {employeeToUpdate ? (
        <EmployeeForm initialData={employeeToUpdate} /> // Pass initialData prop
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EmployeeUpdate;
