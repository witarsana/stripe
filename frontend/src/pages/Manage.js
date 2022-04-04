import * as React from "react";
import axios from "axios";

import "./Manage.css";

import Parent from "../components/Parent";

const Manage = () => {
  const [productName, setProductName] = React.useState("");
  const [productPrice, setProductPrice] = React.useState(0);

  const submit = async e => {
    try {
      const res = await axios.post("http://localhost:8080/create-product", {
        name: productName,
        price: productPrice,
      });
      console.log(res);
    } catch (error) {}
  };

  return (
    <Parent>
      <div className="manage">
        <form
          onSubmit={e => {
            e.preventDefault();
            submit();
          }}
        >
          <label>Product name</label>
          <input
            type={"text"}
            value={productName}
            onChange={e => {
              setProductName(e.target.value);
            }}
          />
          <label>Product price</label>

          <input
            type={"number"}
            value={productPrice}
            onChange={e => {
              setProductPrice(e.target.value);
            }}
          />
          <br />
          <button type="submit">Add</button>
        </form>
      </div>
    </Parent>
  );
};

export default Manage;
