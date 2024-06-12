import { useState, ChangeEvent, FormEvent } from "react";
import { useAppDispatch } from "../../store";
import {
  createEmployee,
  updateEmployee,
  CreateEmployeePayload,
  Employee,
} from "./employeeSlice";
import { useNavigate } from "react-router-dom";

interface EmployeeFormProps {
  initialData?: Employee;
}

const EmployeeForm = ({ initialData }: EmployeeFormProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<CreateEmployeePayload>(
    initialData || {
      fullname: "",
      address: "",
      birthdate: "",
      age: 0,
      gender: "male",
      civilstat: "single",
      contactnum: "",
      salary: 0,
      isactive: false,
    }
  );

  const handleChange = (
    e: ChangeEvent<
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement
      | HTMLInputElement
    >
  ) => {
    const { name, value, type } = e.target;
    const inputElement = e.target as HTMLInputElement;
    const checked = type === "checkbox" ? inputElement.checked : false;

    setFormData((prevData: CreateEmployeePayload) => ({
      ...prevData,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
          ? parseFloat(value)
          : value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (initialData) {
      dispatch(
        updateEmployee({ id: initialData.recid, employeeData: formData })
      );
      setFormData({
        fullname: "",
        address: "",
        birthdate: "",
        age: 0,
        gender: "male",
        civilstat: "single",
        contactnum: "",
        salary: 0,
        isactive: false,
      });
      navigate("/employees/read");
    } else {
      dispatch(createEmployee(formData));
      setFormData({
        fullname: "",
        address: "",
        birthdate: "",
        age: 0,
        gender: "male",
        civilstat: "single",
        contactnum: "",
        salary: 0,
        isactive: false,
      });
      navigate("/employees/read");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col bg-[#e7e7e7] w-1/2 mx-auto my-6 space-y-3 p-12 rounded"
    >
      <label>
        Full Name:
        <input
          type="text"
          name="fullname"
          value={formData.fullname}
          onChange={handleChange}
          required
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-[#000] rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
        />
      </label>

      <label>
        Address:
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-[#000] rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
        />
      </label>
      <label>
        Birthdate:
        <input
          type="date"
          name="birthdate"
          value={formData.birthdate}
          onChange={handleChange}
          required
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-[#000] rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
        />
      </label>
      <label>
        Age:
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          required
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-[#000] rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
        />
      </label>
      <div className="space-x-3">
        Gender:
        <label className="ml-3">
          <input
            type="radio"
            name="gender"
            value="male"
            checked={formData.gender === "male"}
            onChange={handleChange}
          />{" "}
          Male
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="female"
            checked={formData.gender === "female"}
            onChange={handleChange}
          />{" "}
          Female
        </label>
      </div>
      <label>
        Civil Status:
        <select
          name="civilstat"
          value={formData.civilstat}
          onChange={handleChange}
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-[#000] rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
        >
          <option value="single">Single</option>
          <option value="married">Married</option>
          <option value="divorced">Divorced</option>
          <option value="widowed">Widowed</option>
        </select>
      </label>
      <label>
        Contact No:
        <input
          type="tel"
          name="contactnum"
          pattern="[0-9]*"
          value={formData.contactnum}
          onChange={handleChange}
          required
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-[#000] rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
        />
      </label>
      <label>
        Salary:
        <input
          type="number"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
          required
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-[#000] rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
        />
      </label>
      <label>
        Active:
        <input
          type="checkbox"
          name="isactive"
          checked={formData.isactive}
          onChange={handleChange}
          className="mx-3"
        />
      </label>
      <button
        type="submit"
        className="bg-[#09090B] py-3 px-4 rounded text-white"
      >
        Submit
      </button>
    </form>
  );
};

export default EmployeeForm;
