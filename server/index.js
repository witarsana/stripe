const express = require("express");
const app = express();
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET);
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const moment = require("moment");

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

const productId = "price_1Kisr2INTNPdjgHMTXIBjRN4";
const port = "8080";

app.post("/create-checkout-session", async (req, res) => {
  const { domainSuccess, domainFailed } = req.body;

  const expires = moment().add(1, "hour").unix();

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: productId,
          quantity: 1,
        },
      ],
      expires_at: expires,
      mode: "payment",
      success_url: `${domainSuccess}`,
      cancel_url: `${domainFailed}`,
    });
    res.status(200).json({
      sessionUrl: session.url,
      paymentIntent: session.payment_intent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
});

app.post("/create-product", async (req, res) => {
  const { name, price } = req.body;

  try {
    // add product
    const product = await stripe.products.create({
      name: name,
      active: true,
    });

    const priceRes = await stripe.prices.create({
      product: product.id,
      unit_amount: price,
      currency: "usd",
    });

    res.status(200).json({
      product: product,
      price: priceRes,
    });
    // add price
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error brow" });
  }
});

app.post("/cancel-payment", async (req, res) => {
  const { paymentIntentId } = req.body;
  const refund = await stripe.refunds.create({
    payment_intent: paymentIntentId,
  });

  console.log(refund);

  res.status(200).json(refund);
});

app.post(
  "/webhook",
  bodyParser.raw({ type: "application/json" }),
  (req, res) => {
    const payload = req.body;
    console.log("------- web hook here ------- ");
    console.log(payload);

    res.status(200);
  }
);

app.listen(port, () => {
  console.log("Application running on port " + port + "");
});
