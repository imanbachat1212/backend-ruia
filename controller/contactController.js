const Contact = require("../models/contactModel");
const nodemailer = require("nodemailer");
require("dotenv").config();

exports.createContact = async (req, res) => {
  try {
    // Save the new contact in the database
    const newContact = new Contact(req.body);
    await newContact.save();

    // Set up Nodemailer transporter
    let transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email options
    let mailOptions = {
      from: "farah.salhab@ruiasolutions.com", // Replace with your email address
      to: "farah.b.salhab@gmail.com", // Where you want to receive the emails
      subject: "New Contact Form Submission",
      text: `You have a new contact form submission from:
Name: ${req.body.name}
Phone: ${req.body.phone}
Email: ${req.body.email}
Company: ${req.body.company}
Message: ${req.body.message}`,
    };

    // Send email
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.status(500).json({ message: "Error sending email." });
      } else {
        console.log("Email sent: " + info.response);
        res.status(201).json(newContact);
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
