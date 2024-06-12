import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { apiRequest } from "../../lib/apiRequest";

export type Employee = {
  recid: string;
  fullname: string;
  address: string;
  birthdate: string;
  age: number;
  gender: string;
  civilstat: string;
  contactnum: string;
  salary: number;
  isactive: boolean;
}

interface EmployeeState {
  employees: Employee[];
  isLoading: boolean;
  error: string | null;
}

const initialState: EmployeeState = {
  employees: [],
  isLoading: false,
  error: null,
};

export type CreateEmployeePayload = {
  fullname: string;
  address: string;
  birthdate: string;
  age: number;
  gender: string;
  civilstat: string;
  contactnum: string;
  salary: number;
  isactive: boolean;
};

// Create Employee
export const createEmployee = createAsyncThunk<
  Employee,
  CreateEmployeePayload,
  { rejectValue: string }
>("employee/createEmployee", async (employeeData, { rejectWithValue }) => {
  try {
    const response = await apiRequest.post(`/employee/employees`, employeeData);
    return response.data as Employee;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(
        error.response?.data.message || "An error occurred"
      );
    } else {
      return rejectWithValue("An error occurred");
    }
  }
});

// Read Employees
export const readEmployees = createAsyncThunk<
  Employee[],
  void,
  { rejectValue: string }
>("employee/readEmployees", async (_, { rejectWithValue }) => {
  try {
    const response = await apiRequest.get(`/employee/employees`);
    return response.data as Employee[];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(
        error.response?.data.message || "An error occurred"
      );
    } else {
      return rejectWithValue("An error occurred");
    }
  }
});

// Update Employee
export const updateEmployee = createAsyncThunk<
  Employee,
  { id: string; employeeData: CreateEmployeePayload },
  { rejectValue: string }
>(
  "employee/updateEmployee",
  async ({ id, employeeData }, { rejectWithValue }) => {
    try {
      const response = await apiRequest.put(
        `/employee/employees/${id}`,
        employeeData
      );
      return response.data as Employee;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data.message || "An error occurred"
        );
      } else {
        return rejectWithValue("An error occurred");
      }
    }
  }
);

// Delete Employee
export const deleteEmployee = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("employee/deleteEmployee", async (id, { rejectWithValue }) => {
  try {
    await apiRequest.delete(`/employee/employees/${id}`);
    return id;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(
        error.response?.data.message || "An error occurred"
      );
    } else {
      return rejectWithValue("An error occurred");
    }
  }
});

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create Employee
      .addCase(createEmployee.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        createEmployee.fulfilled,
        (state, action: PayloadAction<Employee>) => {
          state.isLoading = false;
          state.employees.push(action.payload);
        }
      )
      .addCase(createEmployee.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Read Employees
      .addCase(readEmployees.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        readEmployees.fulfilled,
        (state, action: PayloadAction<Employee[]>) => {
          state.isLoading = false;
          state.employees = action.payload;
        }
      )
      .addCase(readEmployees.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updateEmployee.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        updateEmployee.fulfilled,
        (state, action: PayloadAction<Employee>) => {
          state.isLoading = false;
          const updatedIndex = state.employees.findIndex(
            (emp) => emp.recid === action.payload.recid
          );
          if (updatedIndex !== -1) {
            state.employees[updatedIndex] = action.payload;
          }
        }
      )
      .addCase(updateEmployee.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteEmployee.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        deleteEmployee.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.isLoading = false;
          state.employees = state.employees.filter(
            (emp) => emp.recid !== action.payload
          );
        }
      )
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default employeeSlice.reducer;
