const express = require("express");
const nodemailer = require("nodemailer");
require("dotenv").config();

const cors = require("cors");

const { body, validationResult } = require("express-validator");

const app = express();

// write a cors options?
const corsOptions = {
  origin: "http://localhost:5173",
  methods: "POST",
  allowedHeaders: "Content-Type, Authorization",
  preflightContinue: false,
};
app.use(cors(corsOptions));

// HEADERS OPTIONS GOES HERE
app.use((req, res, next) => {
  res.setHeader("X-Frame-Options", "Deny");
  res.setHeader(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains; preload"
  );
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");

  // console.log(req.method)
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  } else {
    return next();
  }
});

// Middleware to parse JSON data in request body
app.use(express.json());

//  SEND MAIL ROUTE
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.email,
    pass: process.env.password,
  },
});

transporter.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to send");
  }
});

const router = express.Router();

router.post(
  "/express/payment",
  [
    body("fullName").notEmpty().withMessage("Full Name is required"),
    body("email").isEmail().withMessage("Valid Email is required"),
    body("phoneNumber").notEmpty().withMessage("Phone number is required"),
  ],
  async (req, res) => {
    // Validate inputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const name = req.body.fullName;
    const email = req.body.email;
    const phone = req.body.phoneNumber;
    const transactionId = req.body.transactionID;
    const imageUrl = req.body.imageUrl;

    // Configure nodemailer transporter

    // Email options
    // Email options
    // Email options
    let mailOptions = {
      from: `"${name}" <${email}>`,
      to: process.env.email,
      subject: `Message from ${name} via Express Credit Card Form`,
      html: `<div style="font-family: Arial, sans-serif; max-width: 100%; margin: 0 auto;">
      <h2 style="color: #3498db; font-size: 2.2rem;">ExpressCCShop Receipt Submission</h2>
      <ul style="list-style-type: none; padding: 0;">
        <li style="margin-bottom: 10px; font-size: 1rem; font-weight: 500><strong>Name:</strong> ${name}</li>
        <li style="margin-bottom: 10px;  font-size: 1rem; font-weight: 500"><strong>Email:</strong> ${email}</li>
        <li style="margin-bottom: 10px;  font-size: 1rem; font-weight: 500"><strong>Phone:</strong> ${phone}</li>
        <li style="margin-bottom: 10px;  font-size: 1rem; font-weight: 500"><strong>Transaction ID:</strong> ${transactionId}</li>
        <li style="margin-bottom: 10px;  font-size: 1rem; font-weight: 500">
          <p style="font-size: 1.1rem; font-weight: 500; >Prove of Payment</p> 
          <a href="${imageUrl}" target="_blank" style="text-decoration: none; color: #3498db;">
            <img src="${imageUrl}" alt="Image" style="max-width: 100%; height: auto;">
          </a>
        </li>
      </ul>
    </div>`,
    };

    try {
      // Send email
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent: ", info);

      // Respond to the client
      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      console.error("Error sending email: ", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

router.post(
  "/express/contactInfo",
  [
    body("fullName").notEmpty().withMessage("Full Name is required"),
    body("emailAddress").isEmail().withMessage("Valid Email is required"),
    body("phoneNumber").notEmpty().withMessage("Phone number is required"),
    body("message").notEmpty().withMessage("Message is required"),
  ],
  async (req, res) => {
    const { fullName, phoneNumber, message, emailAddress } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: "Invalid inputs.",
      });
    }
    const mailInfo = {
      from: `"${fullName}" <${emailAddress}>`,
      to: process.env.email,
      subject: `Message from ${fullName} via Express Credit Card Form`,
      html: `<div style="font-family: Arial, sans-serif; max-width: 100%; margin: 0 auto;">
    <h2 style="color: #3498db; font-size: 2.2rem;">ExpressCCShop Receipt Submission</h2>
    <ul style="list-style-type: none; padding: 0;">
      <li style="margin-bottom: 10px; font-size: 1rem; font-weight: 500><strong>Name:</strong> ${fullName}</li>
      <li style="margin-bottom: 10px;  font-size: 1rem; font-weight: 500"><strong>Email:</strong> ${emailAddress}</li>
      <li style="margin-bottom: 10px;  font-size: 1rem; font-weight: 500"><strong>Phone:</strong> ${phoneNumber}</li>
      <li style="margin-bottom: 10px;  font-size: 1rem; font-weight: 500"><strong>message:</strong> ${message}</li>
      <li style="margin-bottom: 10px;  font-size: 1rem; font-weight: 500">
      </li>
    </ul>
  </div>`,
    };

    try {
      const info = await transporter.sendMail(mailInfo);
      console.log("Email sent: ", info);

      // Respond to the client
      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      console.error("Error sending email: ", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

app.use(router);

const PORT = 6158;

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
