import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
//dotenv config
dotenv.config();

const app = express();
app.use(morgan("dev"));
//middlewares
const corsOptions = {
    origin: process.env.CLIENT_APP
}
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

//import routes
import userRoutes from "./routes/user.routes.js";
import itemRoutes from "./routes/item.routes.js";
import locationRoutes from "./routes/location.routes.js";
// routes

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/item", itemRoutes);
app.use("/api/v1/location", locationRoutes);

app.get('/',(req,res)=>{
    return res.status(200).send({
        message:"hello from yaad app"
    })
})
export default app;
