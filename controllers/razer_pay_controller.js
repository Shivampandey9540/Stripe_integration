
import { createErrorMessage, sendErrorResponse } from "../helper/error_handler.js";

import * as razor_service from "../services/razor_pay_service.js"

export const createOrder = async (req, res) => {
    try {
        if (!req.body.amount) {
            return createErrorMessage("Please provide Amount and Currency", 400)
        }

        var options = {
            amount: Number(req.body.amount * 100), // amount in the smallest currency unit
            currency: req.body?.currency,
            receipt: req.body?.receipt
        };
        const order = await razor_service.createOrder(options)

        res.status(200).json({
            status: true,
            order: order,
            message: 'Your Order has been created'
        })

    } catch (error) {
        sendErrorResponse(error, res)
    }
};


export const orderVerification = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
            req.body;


        const data = await razor_service.savingPaymentHistory(razorpay_order_id, razorpay_payment_id, razorpay_signature)

        
        res.status(200).json({
            status: true,
            message: "Payment has beeen Successfully",
            data: {
                payment_id:data.razorpay_payment_id,
                order_id: data.razorpay_order_id
            }
        })


    } catch (error) {
        console.log(error)
    }
}

