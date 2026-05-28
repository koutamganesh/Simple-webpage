// require("dotenv").config();

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const app = express();

// app.use(cors());
// app.use(express.json());


// // MongoDB Connection

// mongoose.connect(process.env.MONGO_URI)

// .then(() => {
//     console.log("MongoDB Connected");
// })

// .catch((err) => {
//     console.log(err);
// });


// // Contact Schema

// const ContactSchema = new mongoose.Schema({

//     name: String,
//     email: String,
//     message: String

// });

// const Contact = mongoose.model("Contact", ContactSchema);


// // API

// app.post("/api/contact", async (req, res) => {

//     try {

//         console.log(req.body);

//         const { name, email, message } = req.body;

//         const newContact = new Contact({
//             name,
//             email,
//             message
//         });

//         await newContact.save();

//         console.log("Data Saved");

//         res.json({
//             message: "Form Submitted Successfully ✅"
//         });

//     } catch (error) {

//         console.log(error);

//         res.status(500).json({
//             message: "Server Error"
//         });

//     }

// });


// // Test Route

// app.get("/", (req, res) => {
//     res.send("Server Running");
// });


// // Start Server

// app.listen(5000, () => {
//     console.log("Server running on port 5000");
// });

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());


// MongoDB Connection

mongoose.connect(process.env.MONGO_URI)

.then(() => {
    console.log("MongoDB Connected");
})

.catch((err) => {
    console.log(err);
});


// Schema

const contactSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    message: {
        type: String,
        required: true
    }

});


// Model

const Contact = mongoose.model("Contact", contactSchema);


// API Route

app.post("/api/contact", async (req, res) => {

    try {

        console.log("Incoming Data:", req.body);

        const { name, email, message } = req.body;

        const newContact = new Contact({

            name,
            email,
            message

        });

        const savedData = await newContact.save();

        console.log("Saved Successfully:", savedData);

        res.status(201).json({
            message: "Form Submitted Successfully ✅"
        });

    } catch (error) {

        console.log("Save Error:", error);

        res.status(500).json({
            message: "Server Error"
        });

    }

});


// Test Route

app.get("/", (req, res) => {
    res.send("Server Running");
});


// Server

app.listen(5000, () => {
    console.log("Server running on port 5000");
});