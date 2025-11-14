import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import purchaseRoutes from "./routes/purchaseRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";


dotenv.config();

// Connect Database
connectDB();

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/purchase", purchaseRoutes);
app.use("/api/dashboard", dashboardRoutes);

const PORT = process.env.PORT || 5000;

app.get("/", (req: Request, res: Response) => {
  res.send("Referral & Credit System Backend is running 🚀");
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
