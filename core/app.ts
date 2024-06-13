const cors = require("cors");
import express from "express";
import userRoutes from "../routes/userRoutes";
import ApiError from "../entities/ApiError";

const app = express();

app.use(express.json());

// Gunakan middleware CORS dengan konfigurasi default (semua origin diizinkan)
app.use(cors());

app.use("/api", userRoutes);

app.use(
  (
    err: ApiError,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res
      .status(err.statusCode || 500)
      .json({ message: err.message || "Internal Server Error" });
  }
);

export default app;
