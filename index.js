import app from "./app.js";
import Razorpay from "razorpay";
import { connectDB } from "./config/database.js";

let port = process.env.PORT

connectDB()

export const instance = new Razorpay({
  key_id: process.env.RAZOR_KEY_ID,
  key_secret: process.env.RAZOR_PAY_SECRET_KEY
});



// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });