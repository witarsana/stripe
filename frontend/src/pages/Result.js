import * as React from "react";
import { useParams, Link } from "react-router-dom";

import Parent from "../components/Parent";

const Result = () => {
  const [msg, setMessage] = React.useState("");
  const param = useParams();

  React.useEffect(() => {
    if (Object.keys(param).length > 0) {
      if (param.status === "success") {
        setMessage("Payment Successful");
      } else {
        setMessage("Payment Failed");
      }
    }
  }, [param]);

  return (
    <Parent>
      <div className="App">
        <h1>Payment status</h1>
        <br />

        <h3>{msg}</h3>
        <Link className="button" to="/">
          Back
        </Link>
        {param.status === "success" && (
          <Link className="button" to="/cancel">
            Cancel payment
          </Link>
        )}
      </div>
    </Parent>
  );
};

export default Result;
