import express from "express";
import cors from "cors";
import auth from "./routes/auth.js";
import employee from "./routes/employee.js";
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));

// Log every incoming request
app.use((req, res, next) => {
  next();
});

// Use routes
app.use("/auth", auth);
app.use("/employee", employee);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
