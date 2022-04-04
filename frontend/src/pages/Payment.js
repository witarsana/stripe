import * as React from "react";

import axios from "axios";
import Parent from "../components/Parent";
const Payment = () => {
  const backend = "http://localhost:8080";
  const successUrl = "http://localhost:3000/result/success";
  const failedUrl = "http://localhost:3000/result/failed";

  const payment = async () => {
    try {
      const resp = await axios.post(backend + "/create-checkout-session", {
        domainSuccess: successUrl,
        domainFailed: failedUrl,
      });
      if (resp) {
        console.log(resp);
        const listPayment =
          JSON.parse(localStorage.getItem("listPayment")) || [];
        // console.log(listPayment);
        listPayment.push(resp.data.paymentIntent);
        localStorage.setItem("listPayment", JSON.stringify(listPayment));
        window.location = resp.data.sessionUrl;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Parent>
      <div className="App">
        <h1>Pay the story</h1>
        <br />

        <button className="button" onClick={payment}>
          Pay
        </button>
      </div>
    </Parent>
  );
};

export default Payment;
