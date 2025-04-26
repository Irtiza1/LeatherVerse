const axios = require("axios");

const easypaisaConfig = {
  apiUrl: "https://easypaisa-api-url.com",  // change to real URL
  storeId: "YOUR_STORE_ID",
  merchantId: "YOUR_MERCHANT_ID",
  password: "YOUR_PASSWORD",
  returnUrl: "http://localhost:5173/shop/easypaisa-return",
  cancelUrl: "http://localhost:5173/shop/easypaisa-cancel",
};

const initiatePayment = async (orderData) => {
  try {
    const payload = {
      storeId: easypaisaConfig.storeId,
      merchantId: easypaisaConfig.merchantId,
      amount: orderData.amount,
      orderRefNum: orderData.orderId,
      expiryDate: orderData.expiryDate,
      mobileNum: orderData.mobileNum,
      emailAddr: orderData.emailAddr,
      postBackURL: easypaisaConfig.returnUrl,
      paymentMethod: "OTC", // or "MobileAccount" depending
      signature: "YOUR_GENERATED_SIGNATURE", // Normally you need to generate signature
    };

    const response = await axios.post(
      `${easypaisaConfig.apiUrl}/initiate`,
      payload
    );

    return response.data;
  } catch (error) {
    console.error("Easypaisa initiation error:", error.response.data || error.message);
    throw error;
  }
};

module.exports = { initiatePayment };


// const axios = require("axios");

// const createEasypaisaPayment = async (orderDetails) => {
//   const payload = {
//     storeId: "your_store_id",
//     orderId: orderDetails.orderId,
//     transactionAmount: orderDetails.totalAmount,
//     mobileAccountNo: orderDetails.customerPhone,
//     emailAddress: orderDetails.customerEmail,
//     paymentMethod: "MAF", // Mobile Account Fund transfer
//     signature: "your_generated_signature",
//     // other required fields according to Easypaisa API docs
//   };

//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };

//   const easypaisaURL = "https://easypay.easypaisa.com.pk/easypay-service/rest/v4/initiateTransaction";

//   const response = await axios.post(easypaisaURL, payload, config);

//   return response.data;
// };

// module.exports = { createEasypaisaPayment };
