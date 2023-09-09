import  express  from "express";
import * as razerController from "../controllers/razer_pay_controller.js";
const router = express.Router();


router.route("/checkout").post(razerController.createOrder);

router.route("/paymentverification").post(razerController.orderVerification);



export default router   