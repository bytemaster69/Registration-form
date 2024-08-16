const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3000;

const username = "pranavprime007"
const password = "pranav123"

console.log(username);
console.log(password);

// Mongoose connection string with error handling
mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.afegj.mongodb.net/registrationFormDB`, {
  dbName: 'myDatabase' // Specify your database name here
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB', err));

// Registration Schema
const registrationSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

// Model of Registration Schema
const Registration = mongoose.model("Registration", registrationSchema);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve the homepage
app.get('/', (req, res) => {
  res.sendFile(__dirname + "/pages/index.html");
});

// Handle registration form submission
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await Registration.findOne({email : email});
    if (!existingUser) {
        const registrationData = new Registration({
            name,
            email,
            password,
          });

    }
    else{
        alert("User already exists");
        res.redirect("/error");
    }
  

    await registrationData.save();
    res.redirect("/success");
  }

   catch (error) {
    console.log(error);
    res.redirect("/error");
  }
});

// Serve the success page
app.get("/success", (req, res) => {
  res.sendFile(__dirname + "/pages/success.html");
});

// Serve the error page
app.get("/error", (req, res) => {
  res.sendFile(__dirname + "/pages/error.html");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});