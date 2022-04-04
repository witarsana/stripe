import * as React from "react";
import axios from "axios";

import Parent from "../components/Parent";

import "./Cancel.css";
import { getByTestId } from "@testing-library/react";

const Cancel = () => {
  const [listPayment, setListPayment] = React.useState([]);
  const [msg, setMessage] = React.useState("");

  const cancelAction = async paymentId => {
    try {
      const cancelResult = await axios.post(
        "http://localhost:8080/cancel-payment",
        {
          paymentIntentId: paymentId,
        }
      );
      console.log(cancelResult);
      setMessage("Payment canceled");
      //   remove from list

      const index = listPayment.findIndex(payment => payment === paymentId);
      listPayment.splice(index, 1);
      localStorage.setItem("listPayment", JSON.stringify(listPayment));

      setListPayment(listPayment);
    } catch (error) {
      console.log(error);
      setMessage("Payment can not be canceled");
    }
  };

  React.useEffect(() => {
    const listExistPayment = JSON.parse(localStorage.getItem("listPayment"));
    if (listExistPayment) {
      setListPayment(listExistPayment);
    }
  }, []);

  return (
    <Parent>
      <div className="Cancel">
        <h1>List payment </h1>
        {msg.length > 0 && <h3>{msg}</h3>}
        <table className="tableCancel">
          <thead>
            <tr>
              <th>Payment ID</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {listPayment.map((item, idx) => (
              <tr key={idx}>
                <td>{item}</td>
                <td>
                  <button
                    onClick={() => {
                      cancelAction(item);
                    }}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Parent>
  );
};

export default Cancel;
