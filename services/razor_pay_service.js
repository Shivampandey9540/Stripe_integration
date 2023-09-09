import { instance } from "../index.js";


import * as crypto from "crypto"
import { Payment } from "../models/paymentModel.js";


export async function createOrder(options) {
    try {
        const order_created = await instance.orders.create(options);
        return order_created
    } catch (error) {
        console.log(error)
        return error
    }
}

export async function savingPaymentHistory(razorpay_order_id, razorpay_payment_id, razorpay_signature) {
    try {

        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZOR_PAY_SECRET_KEY)
            .update(body.toString())
            .digest("hex");

        const isAuthentic = expectedSignature === razorpay_signature;
        if (isAuthentic) {
          const payment_history=   await Payment.create({
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature,
            });
            return  payment_history

        }

    } catch (error) {
        console.log(error)
     return error
    }
}