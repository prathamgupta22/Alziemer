// import app from "./app.js";
import app from './app.js';
import connectDB from '../src/config/db.js'
import dotenv from "dotenv";

dotenv.config();

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server is running at port : ${process.env.PORT} 🚀`);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed", err);
  });
