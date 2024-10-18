import express from "express"; // Import express
import cors from "cors"; // Import CORS middleware
import twilio from "twilio"; // Import Twilio SDK

const app = express(); // Initialize express
const PORT = 3000; // Define the port

//Twilio credentials
const accountSid = "AC98224074c21ea2349d1a4e15e693e805"; // Your Account SID
const authToken = "b3544010441cf599f898b15c37247390"; // Your Auth Token
const twilioWhatsAppNumber = "whatsapp:+14155238886"; // Twilio sandbox number

// Initialize Twilio client
const client = twilio(accountSid, authToken);

// Enable CORS
app.use(cors());
app.use(express.json()); // Middleware to parse JSON request bodies

// Endpoint to handle form submissions
app.post("/submit-form", async (req, res) => {
  const formData = req.body; // Access the submitted form data
  console.log("Form Data:", formData); // Log the data (for testing)

  try {
    // Send a custom WhatsApp message with form data
    const message = await client.messages.create({
      from: twilioWhatsAppNumber,
      to: "whatsapp:+447467303206", // Replace with the owner's WhatsApp number
      body: `New message from your website:\n\nName: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`, // Custom message
    });

    console.log("WhatsApp message sent:", message.sid); // Log the message SID
    res.json({
      message: "Form submitted successfully, WhatsApp message sent!",
    });
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
    res.status(500).json({ message: "Error submitting form" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
